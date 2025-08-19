import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HeroListComponent } from './components/hero-list/hero-list.component';
import { HeroFormTemplateComponent } from './components/hero-form-template/hero-form-template.component';
import { HeroFormReactiveComponent } from './components/hero-form-reactive/hero-form-reactive.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink, 
    RouterLinkActive, 
    HeroFormTemplateComponent,
    HeroFormReactiveComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css', 
  template: `
     <h1>TP — Formulaires Angular</h1>
    <section class="grid">
      <app-hero-form-template></app-hero-form-template>
      <app-hero-form-reactive></app-hero-form-reactive>
    </section>
  `, 
  styles: [`
    .grid {
      display: grid;
      gap: 2rem;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    }
  `]
})
export class AppComponent {
  title = 'heroes-lab';
}
