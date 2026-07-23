import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SkillGroup } from '../resume.data';

@Component({
  selector: 'app-skills',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      id="skills-part"
      class="pb-6 mt-4 mb-4 first:mt-0 break-inside-avoid"
    >
      <section class="break-inside-avoid">
        <h2 class="mb-3 pb-2 border-b border-gray-300 dark:border-gray-600 text-lg font-bold tracking-widest text-gray-700 dark:text-gray-200 print:font-normal">
          SKILLS
        </h2>
        @for (group of groups; track group.category) {
          <section class="mb-2 break-inside-avoid">
            <p class="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400 mt-2 mb-1">
              {{ group.category }}
            </p>
            <ul class="flex flex-wrap -mb-1 font-bold leading-relaxed text-md -mr-1.6">
              @for (skill of group.skills; track skill) {
                <li
                  [class]="'skill-item ' + getCategoryClass(group.category) + ' p-1.5 mb-1 leading-relaxed text-white bg-gray-800 dark:bg-gray-600 mr-1.6 print:bg-white print:border-inset'"
                >
                  {{ skill }}
                </li>
              }
            </ul>
          </section>
        }
      </section>
    </section>
  `,
})
export class SkillsComponent {
  @Input() groups: SkillGroup[] = [];

  getCategoryClass(category: string): string {
    const map: Record<string, string> = {
      'Backend':               'skill-backend',
      'Frontend':              'skill-frontend',
      'Cloud & DevOps':        'skill-cloud',
      'Databases & Data':      'skill-databases',
      'Methodologies & Tools': 'skill-methods',
    };
    return map[category] ?? 'skill-backend';
  }
}
