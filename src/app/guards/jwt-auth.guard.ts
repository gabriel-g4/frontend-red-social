


import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export const jwtAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = localStorage.getItem('token');
  if (!token) {
    router.navigate(['/login']);
    return of(false);
  }

  return authService.autorizar().pipe(
    map(() => true),
    catchError((err) => {
      console.error('Token inválido o error en la autorización', err);
      router.navigate(['/login']);
      return of(false);
    })
  );
};
