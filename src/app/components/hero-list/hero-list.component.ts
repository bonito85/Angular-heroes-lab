import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { InitialsPipe } from '../../pipes/initials.pipe';
import { Hero } from '../../models/heros';
import { HeroService } from '../../services/hero.service';
import { ServiceApiService } from '../../services/service-api.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-hero-list',
  standalone: true,
  imports: [CommonModule, HeroDetailComponent, InitialsPipe],
  templateUrl: './hero-list.component.html',
  styleUrl: './hero-list.component.css'
})



export class HeroListComponent {
  
  heroes: Hero[] = [];
  heroes$!: Observable<Hero[]>;
  selectedHero: Hero | null = null;
  
  constructor(private heroService: HeroService, private api: ServiceApiService) {
    this.heroService.getHeroes().subscribe(h => this.heroes = h);
    this.herolist(); // <- subscribe }
  }

  selectHero(hero: Hero) {
    this.selectedHero = hero;
  }

  herolist() {
    this.heroes$ = this.api.list();
    
  }
}


