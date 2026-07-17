import {
  ChangeDetectionStrategy,
  Component,
  Input,
  signal,
} from '@angular/core';
import { ExperienceEntry } from '../resume.data';

@Component({
  selector: 'app-experience',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      id="experience-part"
      class="pb-4 mt-4 border-b-4 border-gray-300 dark:border-gray-600 first:mt-0"
    >
      <section class="break-inside-avoid">
        <h2 class="mb-2 text-xl font-black tracking-widest text-gray-800 dark:text-gray-100 print:font-normal">
          EXPERIENCE
        </h2>
        @for (entry of entries; track entry.company; let i = $index) {
          <section class="mb-2 border-b-2 border-gray-300 dark:border-gray-600 break-inside-avoid pb-2">
            <header>
              <h3 class="font-semibold text-gray-800 dark:text-gray-100 text-md leading-snugish">
                {{ entry.title }}
              </h3>
              <p class="text-sm leading-normal text-gray-500 dark:text-gray-400">
                {{ entry.period }} ({{ entry.duration }}) |
                <span class="font-medium text-gray-700 dark:text-gray-300">{{ entry.company }}</span>
              </p>
              <p class="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{{ entry.stack }}</p>

              <!-- Toggle button -->
              <button
                class="exp-toggle-btn print:hidden"
                (click)="toggle(i)"
                [attr.aria-expanded]="expanded()[i]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="exp-toggle-icon h-3.5 w-3.5"
                  [class.open]="expanded()[i]"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" />
                </svg>
                {{ expanded()[i] ? 'Hide details' : 'Show details' }}
              </button>
            </header>

            <!-- Collapsible bullets -->
            <div class="exp-details print:!max-h-[none] print:!opacity-100" [class.expanded]="expanded()[i]">
              <ul class="pl-3 mt-2 font-normal text-gray-700 dark:text-gray-300 text-md leading-snugish">
                @for (bullet of entry.bullets; track bullet) {
                  <li>
                    <span class="text-gray-500 dark:text-gray-400 select-none">&rsaquo;</span>
                    {{ bullet }}
                  </li>
                }
              </ul>
            </div>
          </section>
        }
      </section>
    </section>
  `,
})
export class ExperienceComponent {
  @Input() set entries(val: ExperienceEntry[]) {
    this._entries = val;
    // First entry expanded by default
    this.expanded.set(val.map((_, i) => i === 0));
  }
  get entries(): ExperienceEntry[] { return this._entries; }

  private _entries: ExperienceEntry[] = [];
  expanded = signal<boolean[]>([]);

  toggle(index: number): void {
    this.expanded.update(arr => {
      const next = [...arr];
      next[index] = !next[index];
      return next;
    });
  }
}
