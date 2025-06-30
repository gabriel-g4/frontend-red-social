import { Component } from '@angular/core';
import { User } from '../../models/user.interface';
import { Post } from '../../models/posts.interface';
import { PostsService } from '../../services/posts.service';
import { CommonModule } from '@angular/common';
import { PublicacionComponent } from '../../shared/publicacion/publicacion.component';

@Component({
  selector: 'app-mi-perfil',
  imports: [CommonModule, PublicacionComponent],
  templateUrl: './mi-perfil.component.html',
  styleUrl: './mi-perfil.component.css'
})
export class MiPerfilComponent {
   user: User = {
    tipoPerfil: 'normal',
    descripcion: 'Soy un usuario de prueba',
    _id: '6858beb2bc0a1b0ae7da77de',
    username: 'usuario123',
    email: 'usuario@mail.com',
    password: '',
    nombre: 'Gabriel',
    apellido: 'Perez',
    imagenPerfil: '', 
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z'
  };

  publicaciones: Post[] = []; 

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.loadUltimasPublicaciones();
  }

  loadUltimasPublicaciones(): void {
    // Hardcodeamos el usuarioId aquí igual
    this.postsService.getPosts({
      usuarioId: this.user._id,
      limit: 3,
      sortBy: 'date'
    }).subscribe({
      next: (res) => this.publicaciones = res.posts,
      error: (err) => console.error('Error cargando publicaciones', err)
    });
  }
}
