import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
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
        @for (entry of entries; track entry.company) {
          <section class="mb-2 border-b-2 border-gray-300 dark:border-gray-600 break-inside-avoid">
            <header>
              <h3 class="font-semibold text-gray-800 dark:text-gray-100 text-md leading-snugish">
                {{ entry.title }}
              </h3>
              <p class="text-sm leading-normal text-gray-500 dark:text-gray-400">
                {{ entry.period }} ({{ entry.duration }}) |
                <span class="font-medium text-gray-700 dark:text-gray-300">{{ entry.company }}</span>
              </p>
              <p class="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{{ entry.stack }}</p>
            </header>
            <ul class="pl-3 mt-2 font-normal text-gray-700 dark:text-gray-300 text-md leading-snugish">
              @for (bullet of entry.bullets; track bullet) {
                <li>
                  <span class="text-gray-500 dark:text-gray-400 transform -translate-y-px select-none">&rsaquo;</span>
                  {{ bullet }}
                </li>
              }
            </ul>
          </section>
        }
      </section>
    </section>
  `,
})
export class ExperienceComponent {
  @Input() entries: ExperienceEntry[] = [];
}
