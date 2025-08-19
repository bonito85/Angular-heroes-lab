import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ValidationErrors, AbstractControl, ReactiveFormsModule, FormBuilder, Validators, FormArray } from '@angular/forms';

function forbiddenName(control: AbstractControl): ValidationErrors | null {
  const v = (control.value ?? '').toLowerCase();
  return v === 'batman' ? { forbiddenName: true } : null;
}

@Component({
  selector: 'app-hero-form-reactive',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './hero-form-reactive.component.html',
  styleUrl: './hero-form-reactive.component.css'
})
export class HeroFormReactiveComponent {
  private fb = inject(FormBuilder);
  heroForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), forbiddenName]],
    power: [''],
    email: ['', Validators.email],
    powers: this.fb.array([this.fb.control('')])
  });

  get name() { return this.heroForm.get('name'); }
  get email() { return this.heroForm.get('email'); }
  get powers() { return this.heroForm.get('powers') as FormArray; }

  addPower() {
    this.powers.push(this.fb.control(''));
  }

  removePower(index: number) {
    this.powers.removeAt(index);
  }

  submit() {
    if (this.heroForm.invalid) {
      this.heroForm.markAllAsTouched();
      return;
    }
    console.log('Reactive submit', this.heroForm.value);
    this.heroForm.reset({
      name: '',
      power: '',
      email: '',
      powers: ['']
    });
  }
}