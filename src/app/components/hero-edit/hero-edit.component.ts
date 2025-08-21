import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceApiService } from '../../services/service-api.service';
import { Hero } from '../../models/heros';

@Component({
  selector: 'app-hero-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './hero-edit.component.html',
  styleUrl: './hero-edit.component.css'
})
export class HeroEditComponent implements OnInit {
  private fb = inject(FormBuilder); 
  private route = inject(ActivatedRoute); 
  private router = inject(Router); 
  private api = inject(ServiceApiService);

  form = this.fb.group({
    id: [null as number | null], 
    name: ['', Validators.required], 
    power: ['']
  });

  isNew = true; 
 
  ngOnInit(): void {
  const idParam = this.route.snapshot.paramMap.get('id');
  if (idParam) {
    this.isNew = false;
    const id = Number(idParam);
    this.api.get(id).subscribe(hero => {
      // Patch uniquement les champs attendus par le formulaire
      this.form.patchValue({
        id: hero.id ?? null,
        name: hero.name ?? '',
        power: hero.power ?? ''
      });
    });
  }
}

  save() {
    if (this.form.invalid) { 
      this.form.markAllAsTouched(); 
      return; 
    }
    const hero = this.form.value as Hero;
    const req$ = this.isNew ? this.api.create(hero) : this.api.update(hero);
    req$.subscribe({
      next: () => this.router.navigate(['/heroes']),
      error: err => alert('Erreur API: ' + (err?.message ?? 'inconnue'))
    });
  }

  deleteHero() {
  const id = this.form.value.id;
  if (id != null) {
    if (confirm('Are you sure you want to delete this hero?')) {
      this.api.remove(id).subscribe({
        next: () => this.router.navigate(['/heroes']),
        error: err => alert('Erreur API: ' + (err?.message ?? 'inconnue'))
      });
    }
  }
}

  cancel() { 
    this.router.navigate(['/heroes']); 
  }
}