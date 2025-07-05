import { Component } from '@angular/core';
import { User } from '../../models/user.interface';
import { Post } from '../../models/posts.interface';
import { PostsService } from '../../services/posts.service';
import { CommonModule } from '@angular/common';
import { PublicacionComponent } from '../../shared/publicacion/publicacion.component';
import { environment } from '../../../environments/environment.development';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-mi-perfil',
  imports: [CommonModule, PublicacionComponent],
  templateUrl: './mi-perfil.component.html',
  styleUrl: './mi-perfil.component.css'
})
export class MiPerfilComponent {
  URL = environment.URL
  userId = ""
  user!: User;

  publicaciones: Post[] = []; 

  constructor(private postsService: PostsService, private authService: AuthService) {}

  
  ngOnInit(): void {
  this.authService.autorizar().subscribe({
    next: (res) => {
      
      this.userId = res.data.id;
      this.loadUltimasPublicaciones();
    },
    error: (err) => {
      console.error('No autorizado:', err);
      this.loadUltimasPublicaciones();
    }
  });
}
  

  loadUltimasPublicaciones(): void {
    // Hardcodeamos el usuarioId aquí igual
    this.postsService.getPosts({
      usuarioId: this.userId,
      limit: 3,
      sortBy: 'date'
    }).subscribe({
      next: (res) =>{ 
        this.publicaciones = res.posts
        this.user = this.authService.getUsuarioActual() || {
              "_id": "6858beb2bc0a1b0ae7da77de",
              "password" : "",
              "username": "testuser",
              "email": "test@gmail.com",
              "nombre": "Usuario",
              "apellido": "Prueba",
              "imagenPerfil": "/uploads/imagen-1751218915664-604533924.jpg",
              "tipoPerfil": "usuario",
              "isActive": true,
              "fechaNacimiento": "2010-01-01T00:00:00.000Z",
              "descripcion": "Soy un usuario de prueba, si no se pudo cargar el usuario normal",
              "createdAt": "2025-06-23T02:40:50.399Z",
              "updatedAt": "2025-06-23T02:40:50.399Z",
          };
        console.log(this.user)
      },
      error: (err) => console.error('Error cargando publicaciones', err)
    });
  }
}
