import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';import { inject } from '@vercel/analytics';import { injectSpeedInsights } from '@vercel/speed-insights';


@Component({
    selector: 'app-root',
    standalone: true,
    imports: [],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'resume';

  ngOnInit(): void {
    inject();
    injectSpeedInsights();
    initFlowbite();
  }

  goTo(section: string) {
    const el = document.getElementById(`${section}`);
    el?.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  }
}
