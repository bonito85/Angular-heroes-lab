import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeroService } from './services/hero.service';
import { Hero } from './models/heros';

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <h2>My Heroes</h2>
    <ul class="list">
      <li *ngFor="let hero of heroes">
        <a [routerLink]="['/detail', hero.id]">{{ hero.name }}</a>
      </li>
    </ul>
  `,
  styles: [`
    .list {
      list-style: none;
      padding: 0;
    }
    li {
      margin: .25rem 0;
    }
    a {
      text-decoration: none;
      color: #333;
      padding: 0.5rem;
      display: block;
      border-radius: 4px;
    }
    a:hover {
      background-color: #f5f5f5;
    }
  `]
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) {}

  ngOnInit() { 
    this.heroService.getHeroes().subscribe(h => this.heroes = h); 
  }
}