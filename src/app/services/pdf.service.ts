import { Injectable } from '@angular/core';

/** A4 page geometry, in millimetres. */
const PAGE_W_MM = 210;
const PAGE_H_MM = 297;
const MARGIN_MM = 12;

/**
 * CSS width the resume is laid out at while capturing — must match the
 * `.pdf-capture .page` width in `styles.css`.
 */
const CAPTURE_WIDTH_PX = 820;

/** Device pixels per CSS pixel in the capture. Higher = sharper, heavier. */
const CAPTURE_SCALE = 2;

/** How much of a page, at most, we give up to break on a gap instead. */
const BREAK_SEARCH_RATIO = 0.2;

/** A gap narrower than this (canvas px) is between lines, not between blocks. */
const MIN_GAP_PX = 8;

/**
 * Renders a DOM subtree to a multi-page A4 PDF.
 *
 * `html2canvas-pro` (rather than `html2canvas`) is used because Tailwind v4
 * emits `oklch()` colours, which the original parser chokes on.
 */
@Injectable({ providedIn: 'root' })
export class PdfService {
  async download(source: HTMLElement, fileName: string): Promise<void> {
    const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
      import('html2canvas-pro'),
      import('jspdf'),
    ]);

    const photos = await this.inlineImages(source);
    const canvas = await this.capture(html2canvas, source, photos);

    const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait', compress: true });
    const contentWmm = PAGE_W_MM - MARGIN_MM * 2;
    const contentHmm = PAGE_H_MM - MARGIN_MM * 2;
    const pxPerMm = canvas.width / contentWmm;
    const pageHpx = contentHmm * pxPerMm;

    for (let y = 0, page = 0; y < canvas.height; page++) {
      const remaining = canvas.height - y;
      const sliceH = remaining <= pageHpx ? remaining : this.findBreak(canvas, y, pageHpx);

      if (page > 0) pdf.addPage();
      pdf.addImage(
        this.sliceToDataUrl(canvas, y, sliceH),
        'JPEG',
        MARGIN_MM,
        MARGIN_MM,
        contentWmm,
        sliceH / pxPerMm,
      );
      y += sliceH;
    }

    pdf.save(fileName);
  }

  // ── Private ───────────────────────────────────────────────

  /**
   * Snapshots `source` with the page switched into `.pdf-capture` mode.
   *
   * html2canvas clones the DOM — inlining every computed style, because
   * Angular's component tags are custom elements — synchronously, before its
   * first `await`. Capture mode can therefore be lifted the moment the call
   * returns, so the browser never paints the stripped-down layout.
   */
  private async capture(
    html2canvas: typeof import('html2canvas-pro').default,
    source: HTMLElement,
    photos: Map<string, string>,
  ): Promise<HTMLCanvasElement> {
    const root = document.documentElement;
    const wasDark = root.classList.contains('dark');
    root.classList.add('pdf-capture');
    root.classList.remove('dark');

    let pending: Promise<HTMLCanvasElement>;
    try {
      pending = html2canvas(source, {
        scale: CAPTURE_SCALE,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
        scrollX: 0,
        scrollY: 0,
        windowWidth: CAPTURE_WIDTH_PX,
        windowHeight: Math.max(window.innerHeight, source.scrollHeight + 400),
        onclone: (_doc, page) => {
          page.querySelectorAll('img').forEach(img => {
            const data = photos.get(img.src);
            if (data) img.src = data;
          });
        },
      });
    } finally {
      root.classList.remove('pdf-capture');
      root.classList.toggle('dark', wasDark);
    }
    return pending;
  }

  /**
   * Maps every `<img>` in the subtree to a data URL, keyed by its `src`. The
   * clone renders inside an `about:blank` iframe, where a re-fetch of the
   * original URL is one more thing that can fail; handing it bytes cannot.
   */
  private async inlineImages(source: HTMLElement): Promise<Map<string, string>> {
    const entries = await Promise.all(
      Array.from(source.querySelectorAll('img'), async img => {
        try {
          const blob = await (await fetch(img.src)).blob();
          const data = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          });
          return [img.src, data] as const;
        } catch {
          return null; // fall back to the original src
        }
      }),
    );
    return new Map(entries.filter((e): e is readonly [string, string] => e !== null));
  }

  /**
   * Height of the next page: a full page, pulled back to the *tallest* run of
   * blank rows near the bottom. Working on the rendered pixels rather than on
   * DOM offsets keeps this honest about where the ink actually landed, and
   * the tallest gap in the window is the outermost block boundary — the space
   * between two jobs is bigger than the space between two lines of one job.
   */
  private findBreak(canvas: HTMLCanvasElement, top: number, pageH: number): number {
    const ideal = Math.floor(pageH);
    const searchH = Math.floor(ideal * BREAK_SEARCH_RATIO);
    const from = top + ideal - searchH;
    const ctx = canvas.getContext('2d');
    if (!ctx || searchH < MIN_GAP_PX) return ideal;

    let rows: Uint8ClampedArray;
    try {
      rows = ctx.getImageData(0, from, canvas.width, searchH).data;
    } catch {
      return ideal; // cross-origin content tainted the canvas
    }

    let best = { start: 0, height: 0 };
    let runStart = -1;
    for (let row = 0; row <= searchH; row++) {
      if (row < searchH && this.isBlankRow(rows, row, canvas.width)) {
        if (runStart < 0) runStart = row;
        continue;
      }
      // `>=` breaks ties towards the lowest gap, filling the page.
      if (runStart >= 0 && row - runStart >= best.height) {
        best = { start: runStart, height: row - runStart };
      }
      runStart = -1;
    }
    if (best.height < MIN_GAP_PX) return ideal;
    // Never return 0: the caller advances by this, and would loop forever.
    return Math.max(1, from + best.start + Math.floor(best.height / 2) - top);
  }

  private isBlankRow(data: Uint8ClampedArray, row: number, width: number): boolean {
    // Every other pixel: still narrower than any glyph stem, half the work.
    for (let x = 0; x < width; x += 2) {
      const i = (row * width + x) * 4;
      if (data[i] < 250 || data[i + 1] < 250 || data[i + 2] < 250) return false;
    }
    return true;
  }

  private sliceToDataUrl(canvas: HTMLCanvasElement, top: number, height: number): string {
    const slice = document.createElement('canvas');
    slice.width = canvas.width;
    slice.height = Math.ceil(height);
    const ctx = slice.getContext('2d')!;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, slice.width, slice.height);
    ctx.drawImage(canvas, 0, top, canvas.width, height, 0, 0, canvas.width, height);
    return slice.toDataURL('image/jpeg', 0.92);
  }
}
