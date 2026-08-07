import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent } from 'rxjs';
import { ViewportScroller } from '@angular/common';
import { inject as injectAnalytics } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights';
import { WeatherData, WeatherService } from './services/weather.service';
import { BackgroundService } from './services/background.service';
import { HeroComponent } from './components/hero.component';
import { SummaryComponent } from './components/summary.component';
import { SkillsComponent } from './components/skills.component';
import { ExperienceComponent } from './components/experience.component';
import { EducationComponent } from './components/education.component';
import { ContactComponent } from './components/contact.component';
import {
  PROFILE,
  SUMMARY,
  SKILL_GROUPS,
  EXPERIENCE,
  EDUCATION,
  CONTACT,
} from './resume.data';
import html2pdf from 'html2pdf.js';


@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HeroComponent,
    SummaryComponent,
    SkillsComponent,
    ExperienceComponent,
    EducationComponent,
    ContactComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  readonly profile = PROFILE;
  readonly summary = SUMMARY;
  readonly skillGroups = SKILL_GROUPS;
  readonly experience = EXPERIENCE;
  readonly education = EDUCATION;
  readonly contact = CONTACT;

  readonly navLinks = [
    { label: 'Home',       anchor: 'home-part'       },
    { label: 'Summary',    anchor: 'summary-part'    },
    { label: 'Skills',     anchor: 'skills-part'     },
    { label: 'Experience', anchor: 'experience-part' },
    { label: 'Education',  anchor: 'education-part'  },
    { label: 'Contact',    anchor: 'contact-part'    },
  ];

  weather      = signal<WeatherData | null>(null);
  backgroundUrl = signal<string | undefined>(undefined);
  isDark       = signal(false);
  isMenuOpen   = signal(false);
  activeSection = signal<string>('home-part');
  scrollProgress = signal<number>(0);
  navScrolled  = signal<boolean>(false);

  private readonly weatherService = inject(WeatherService);
  private readonly backgroundService = inject(BackgroundService);
  private readonly scroller       = inject(ViewportScroller);
  private readonly destroyRef     = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      this.initRevealObserver();
      this.initScrollSpy();
    });
  }

  async ngOnInit(): Promise<void> {
    injectAnalytics();
    injectSpeedInsights();
    this.initDarkMode();
    this.initScrollListener();

    const data = await this.weatherService.getWeather();
    this.weather.set(data);
    if (data) {
      const [c1, c2, c3] = data.colors;
      document.body.style.setProperty('--wc1', c1);
      document.body.style.setProperty('--wc2', c2);
      document.body.style.setProperty('--wc3', c3);
      this.backgroundUrl.set(this.backgroundService.getBackgroundUrl(data));
    }
  }

  toggleDarkMode(): void {
    this.setDark(!this.isDark());
  }

  toggleMenu(): void {
    this.isMenuOpen.update(v => !v);
  }

  printPage(): void {
    window.print();
  }

  downloadCV(): void {
    const element = document.querySelector('main') as HTMLElement;
    if (!element) return;
    html2pdf()
      .set({
        margin:        [0.5, 0.5, 0.5, 0.5],
        filename:      'CV.pdf',
        image:         { type: 'jpeg', quality: 0.98 },
        html2canvas:   { scale: 2, letterRendering: true, useCORS: true },
        jsPDF:         { unit: 'in', format: 'a4', orientation: 'portrait' },
      })
      .from(element)
      .save();
  }

  goTo(section: string): void {
    this.isMenuOpen.set(false);
    this.scroller.scrollToAnchor(section);
  }

  // ── Private ───────────────────────────────────────────────

  private initScrollListener(): void {
    fromEvent(window, 'scroll')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        const scrollTop  = window.scrollY;
        const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
        this.scrollProgress.set(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
        this.navScrolled.set(scrollTop > 50);
      });
  }

  private initRevealObserver(): void {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.08 },
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  private initScrollSpy(): void {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) this.activeSection.set(e.target.id); });
      },
      { rootMargin: '-25% 0px -65% 0px', threshold: 0 },
    );
    this.navLinks.forEach(({ anchor }) => {
      const el = document.getElementById(anchor);
      if (el) observer.observe(el);
    });
  }

  private initDarkMode(): void {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    this.setDark(mq.matches);
    fromEvent<MediaQueryListEvent>(mq, 'change')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(e => this.setDark(e.matches));
  }

  private setDark(dark: boolean): void {
    document.documentElement.classList.add('theme-transitioning');
    this.isDark.set(dark);
    document.documentElement.classList.toggle('dark', dark);
    setTimeout(() => document.documentElement.classList.remove('theme-transitioning'), 400);
  }
}
