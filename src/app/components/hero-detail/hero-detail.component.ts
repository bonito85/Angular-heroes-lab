import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Hero } from '../../models/heros';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HeroService } from '../../services/hero.service';
import { switchMap } from 'rxjs';


@Component({
  selector: 'app-hero-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.css', 
  template: `
    <ng-container *ngIf="hero; else notFound">
      <h2>{{ hero.name }} Details</h2>
      <div><strong>ID:</strong> {{ hero.id }}</div>
      <button (click)="goBack()" class="btn">Back</button>
    </ng-container>
    <ng-template #notFound>
      <p>Hero not found.</p>
      <a routerLink="/heroes">Back to list</a>
    </ng-template>
  `,
  styles: [`
    .btn {
      background-color: #007bff;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      margin-top: 1rem;
    }
    .btn:hover {
      background-color: #0056b3;
    }
  `]
})
export class HeroDetailComponent implements OnInit{  
  
  @Input()  hero?: Hero;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private heroService: HeroService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => this.heroService.getHero(Number(params.get('id'))))
    ).subscribe(h => this.hero = h);
  }

  goBack() { 
    history.state?.navigationId ? history.back() : this.router.navigate(['/heroes']); 
  }
}
