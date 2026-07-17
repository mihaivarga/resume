import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ContactEntry } from '../resume.data';

@Component({
  selector: 'app-contact',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="contact-part" class="pb-2 mt-4 mb-0 first:mt-0">
      <section class="break-inside-avoid">
        <h2 class="mb-2 text-lg font-bold tracking-widest text-gray-700 dark:text-gray-200 print:font-normal">
          CONTACT
        </h2>
        <section class="pb-4 mb-2 border-b-4 border-gray-300 dark:border-gray-600 break-inside-avoid">
          <ul class="pr-7 list-inside">
            @for (item of entries; track item.label) {
              <li class="mt-1 leading-normal text-gray-500 dark:text-gray-400 transition duration-100 ease-in hover:text-gray-700 text-md">
                <a [href]="item.href" class="group">
                  <i class="mr-2 text-lg {{ item.icon }} text-gray-600 dark:text-gray-400"></i>
                  <span class="mr-2 text-lg font-semibold text-gray-700 dark:text-gray-200 leading-snugish">
                    {{ item.label }}:
                  </span>
                  {{ item.display }}
                  <span class="inline-block font-normal text-gray-500 dark:text-gray-400 transition duration-100 ease-in group-hover:text-gray-700 print:text-black">
                    ↗
                  </span>
                </a>
              </li>
            }
          </ul>
        </section>
      </section>
    </section>
  `,
})
export class ContactComponent {
  @Input() entries: ContactEntry[] = [];
}
