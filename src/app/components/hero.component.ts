import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header
      id="home-part"
      class="flex justify-between items-center mb-2 w-full border-b-4 border-gray-300 dark:border-gray-600 pb-4"
    >
      <section class="block animate-fade-in">
        <h1 class="mb-0 text-5xl font-bold">
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
            {{ name }}
          </span>
        </h1>
        <h2 class="m-0 text-2xl font-semibold text-gray-700 dark:text-gray-200 leading-snugish animate-fade-in animate-delay-1">
          {{ title }}
        </h2>
        <h3 class="m-0 mt-2 text-xl font-semibold text-gray-500 dark:text-gray-400 leading-snugish">
          {{ location }}
        </h3>
      </section>
      <section class="shrink-0 ml-6">
        <img
          [src]="photo"
          [alt]="name"
          class="w-36 h-36 object-cover rounded-2xl shadow-lg ring-4 ring-gray-300 dark:ring-gray-500 photo-glow"
        />
      </section>
    </header>
  `,
})
export class HeroComponent {
  @Input() name = '';
  @Input() title = '';
  @Input() location = '';
  @Input() photo = '';
}
