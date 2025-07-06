import { Component } from '@angular/core';
import { User, UsuarioEjemplo } from '../../models/user.interface';
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
  isAdmin = false;

  publicaciones: Post[] = []; 

  constructor(private postsService: PostsService, private authService: AuthService) {}

  
  ngOnInit(): void {
  this.authService.autorizar().subscribe({
    next: (res) => {
      
      this.userId = res.data.id;
      this.user = this.authService.getUsuarioActual() || UsuarioEjemplo;
      this.isAdmin = this.user?.tipoPerfil === 'administrador'
      this.loadUltimasPublicaciones();
    },
    error: (err) => {
      console.error('No autorizado:', err);
      this.loadUltimasPublicaciones();
    }
  });
}

onPublicacionEliminada(postId: string) {
  this.publicaciones = this.publicaciones.filter(pub => pub._id !== postId);
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
        
        console.log(this.user)
      },
      error: (err) => console.error('Error cargando publicaciones', err)
    });
  }
}
