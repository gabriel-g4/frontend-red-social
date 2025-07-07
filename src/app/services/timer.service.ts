import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { WarningModalComponent } from '../shared/warning-modal/warning-modal.component';
import { Injector } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private warningTimer: any;
  private expirationTimer: any;
  private authService!: AuthService;

  constructor(
    private dialog: MatDialog,
    private injector: Injector,
    private router: Router
  ) {}

  private getAuthService(): AuthService {
    if (!this.authService) {
      this.authService = this.injector.get(AuthService);
    }
    return this.authService;
  }

  startTimers(): void {
    this.clearTimers();

    // Después de 10 minutos, mostrar modal
    this.warningTimer = setTimeout(() => {
      const dialogRef = this.dialog.open(WarningModalComponent);

      dialogRef.afterClosed().subscribe((result: boolean) => {
        if (result) {
          this.getAuthService().autorizar().subscribe({
            next: () => this.startTimers(), // Reiniciar temporizadores
            error: () => this.router.navigate(['/login'])
          });
        }
        // Si no acepta, el token expira en 5 minutos más
      });
    }, 10 * 60 * 1000);

    // Después de 15 minutos, cerrar sesión si no se renovó
    this.expirationTimer = setTimeout(() => {
      this.getAuthService().logout();
      this.authService.setLoggedIn(false);
      this.router.navigate(['/login']);
    }, 15 * 60 * 1000);
  }

  clearTimers(): void {
    clearTimeout(this.warningTimer);
    clearTimeout(this.expirationTimer);
  }
}
