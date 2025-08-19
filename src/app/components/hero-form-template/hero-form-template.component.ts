import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-hero-form-template',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './hero-form-template.component.html',
  styleUrl: './hero-form-template.component.css'
})
export class HeroFormTemplateComponent {
  hero = { name: '', power: '', email: '' };

  submit(form: NgForm) {
    if (form.invalid) return;
    console.log('TD submmit', form.value);
    form.reset();
  }
}
