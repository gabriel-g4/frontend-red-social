import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  loggedIn = false;
  isAdmin = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.usuarioActual$.subscribe(user => {
      this.isAdmin = user?.tipoPerfil?.includes('administrador') || false;
    });
    this.authService.isLoggedIn().subscribe(status => {
      this.loggedIn = status;
    });
  }
}
