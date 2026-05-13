import { Component, OnInit, inject } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { inject as injectAnalytics } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights';
import { WeatherData, WeatherService } from './services/weather.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'resume';
  weather: WeatherData | null = null;
  isDark = false;
  isMenuOpen = false;

  private readonly weatherService = inject(WeatherService);

  async ngOnInit(): Promise<void> {
    injectAnalytics();
    injectSpeedInsights();
    initFlowbite();

    this.initDarkMode();
    this.weather = await this.weatherService.getWeather();
    if (this.weather) {
      const [c1, c2, c3] = this.weather.colors;
      document.body.style.setProperty('--wc1', c1);
      document.body.style.setProperty('--wc2', c2);
      document.body.style.setProperty('--wc3', c3);
    }
  }

  toggleDarkMode(): void {
    this.setDark(!this.isDark);
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  private initDarkMode(): void {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    this.setDark(mq.matches);
    mq.addEventListener('change', (e) => this.setDark(e.matches));
  }

  private setDark(dark: boolean): void {
    this.isDark = dark;
    document.documentElement.classList.toggle('dark', dark);
  }

  goTo(section: string) {
    this.isMenuOpen = false;
    const el = document.getElementById(`${section}`);
    el?.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  }
}
