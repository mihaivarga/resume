import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { EducationEntry } from '../resume.data';

@Component({
  selector: 'app-education',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      id="education-part"
      class="pb-0 mt-4 first:mt-0 break-inside-avoid"
    >
      <section class="break-inside-avoid">
        <h2 class="mb-3 pb-2 border-b border-gray-300 dark:border-gray-600 text-lg font-bold tracking-widest text-gray-700 dark:text-gray-200 print:font-normal">
          EDUCATION
        </h2>
        @for (entry of entries; track entry.institution) {
          <section class="mb-2 mt-2 break-inside-avoid">
            <header>
              <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-200 leading-snugish">
                {{ entry.institution }}
              </h3>
              <p class="leading-normal text-gray-500 dark:text-gray-400 text-md">
                {{ entry.period }} | {{ entry.degree }}
              </p>
            </header>
            <ul class="mt-2 list-disc list-inside text-gray-800 dark:text-gray-100 text-md">
              @for (detail of entry.details; track detail.label) {
                <li>
                  <span class="font-semibold text-md">{{ detail.label }}: </span>
                  {{ detail.value }}
                </li>
              }
            </ul>
          </section>
        }
      </section>
    </section>
  `,
})
export class EducationComponent {
  @Input() entries: EducationEntry[] = [];
}
