import { AsyncValidatorFn } from '@angular/forms';
import { of, timer } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

export function emailTakenValidator(): AsyncValidatorFn {
  const taken = ['taken@hero.io'];
  
  return control => timer(400).pipe(
    switchMap(() => of(taken.includes(control.value))),
    map(isTaken => (isTaken ? { emailTaken: true } : null))
  );
}

// Usage dans le composant reactive :
// email: ['', [Validators.email], [emailTakenValidator()]]

// Template ajout :
// <small *ngIf="email?.hasError('emailTaken')">Email déjà utilisé</small>