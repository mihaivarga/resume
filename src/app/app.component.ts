import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';

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
    initFlowbite();
  }

  goTo(section: string) {
    const el = document.getElementById(`${section}`);
    el?.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  }
}
