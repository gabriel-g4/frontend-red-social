import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-cargando',
  imports: [],
  templateUrl: './cargando.component.html',
  styleUrl: './cargando.component.css'
})

export class CargandoComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {}

  

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if (!token) {
      // No hay token: redirigir directo a login
      this.router.navigate(['/login']);
      return;
    }
    this.authService.autorizar().subscribe({
      next: () => {
        setTimeout(() => {
          this.router.navigate(['/publicaciones']);
        }, 1500); 
      },
      error: () => {
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      }
    });
  }
}


