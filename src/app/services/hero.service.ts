import { Injectable } from '@angular/core';
import { Hero } from '../models/heros';
import { Observable, of } from 'rxjs';
import { HEROES } from '../mock-heroes';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  getHeroes(): Observable<Hero[]> {
    return of(HEROES);
  } 
  getHero(id: number): Observable<Hero | undefined> {
    return of(HEROES.find(h => h.id === id));
  }
}
