import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeroService } from './services/hero.service';
import { Hero } from './models/heros';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <h2>Top Heroes</h2>
    <div class="grid">
      <a *ngFor="let hero of topHeroes" [routerLink]="['/detail', hero.id]">
        {{ hero.name }}
      </a>
    </div>
  `,
  styles: [`
    .grid {
      display: grid;
      gap: .5rem;
      grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    }
    a {
      padding: .5rem .75rem;
      border: 1px solid #ddd;
      border-radius: .5rem;
      display: block;
      text-decoration: none;
      color: #333;
    }
    a:hover {
      background-color: #f5f5f5;
    }
  `]
})
export class DashboardComponent implements OnInit {
  topHeroes: Hero[] = [];

  constructor(private heroService: HeroService) {}

  ngOnInit() { 
    this.heroService.getHeroes().subscribe(list => 
      this.topHeroes = list.slice(1, 5)
    ); 
  }
}