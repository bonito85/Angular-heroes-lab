import { Routes } from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import { HeroesComponent } from './heroes.component';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';

export const routes: Routes = [
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'}, 
    { path: 'dashboard', component: DashboardComponent },
    { path: 'heroes', component: HeroesComponent },
    { path: 'detail/:id', component: HeroDetailComponent },
    { path: 'heroes', loadComponent: () => import('./components/hero-list/hero-list.component').then(m => m.HeroListComponent) },
    { path: 'heroes/new', loadComponent: () => import('./components/hero-edit/hero-edit.component').then(m => m.HeroEditComponent)},
    { path: 'heroes/:id', loadComponent: () => import('./components/hero-edit/hero-edit.component').then(m => m.HeroEditComponent) },
    { path: '**', redirectTo: 'dashboard' },
];
