
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Primero autorizamos el token (verifica que esté ok)
  return authService.autorizar().pipe(
    switchMap((user) => {
      // Suponiendo que 'user' tiene el perfil o roles
      if (user?.data?.roles?.includes('administrador')) {
        return of(true);
      } else {
        router.navigate(['/not-authorized']); // O ruta para usuarios sin permiso
        return of(false);
      }
    }),
    catchError((err) => {
      console.error('Error de autorización o token inválido', err);
      router.navigate(['/login']);
      return of(false);
    })
  );
};
