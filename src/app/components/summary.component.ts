import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-summary',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      id="summary-part"
      class="pb-4 mt-0 border-b-4 border-gray-300 dark:border-gray-600 first:mt-0"
    >
      <section class="break-inside-avoid">
        <h2 class="mb-2 text-xl font-bold tracking-widest text-gray-700 dark:text-gray-200 print:font-normal">
          SUMMARY
        </h2>
        <section class="mb-2 break-inside-avoid">
          <p class="mt-2 leading-normal text-gray-700 dark:text-gray-300 text-md">{{ body }}</p>
          <p class="mt-3 leading-normal text-gray-700 dark:text-gray-300 text-md">{{ body2 }}</p>
          <p class="mt-3 leading-normal text-gray-700 dark:text-gray-300 text-md">
            <span class="font-semibold text-gray-800 dark:text-gray-100">Core Competencies:</span>
            {{ coreCompetencies }}
          </p>
          <p class="mt-1 leading-normal text-gray-700 dark:text-gray-300 text-md">
            <span class="font-semibold text-gray-800 dark:text-gray-100">Primary Stack:</span>
            {{ primaryStack }}
          </p>
        </section>
      </section>
    </section>
  `,
})
export class SummaryComponent {
  @Input() body = '';
  @Input() body2 = '';
  @Input() coreCompetencies = '';
  @Input() primaryStack = '';
}
