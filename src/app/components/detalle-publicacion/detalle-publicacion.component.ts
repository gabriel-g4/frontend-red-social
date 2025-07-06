import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { CommentsService } from '../../services/comments.service';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment.development';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { UsuarioEjemplo } from '../../models/user.interface';

@Component({
  selector: 'app-detalle-publicacion',
  imports: [CommonModule],
  templateUrl: './detalle-publicacion.component.html',
  styleUrl: './detalle-publicacion.component.css'
})


export class DetallePublicacionComponent implements OnInit {
  URL = environment.URL
  isAdmin = false;
  postId!: string;
  userId = ""
  post: any;
  comentarios: any[] = [];
  user: any;

  page: number = 1;
  limit: number = 5;
  hasMore: boolean = true;
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private postService: PostsService,
    private commentsService: CommentsService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get('id')!;

    this.authService.autorizar().subscribe({
      next: (res) => {
        this.userId = res.data.id;
        this.user = this.authService.getUsuarioActual() || UsuarioEjemplo;
          this.isAdmin = this.user?.tipoPerfil === 'administrador'
        this.cargarPublicacion();
        this.cargarComentarios();
        console.log(this.comentarios)
      },
      error: (err) => {
        console.error('No autorizado:', err);
        // redirigir al login, mostrar error, etc.
      }
    })
    
    
  }

  cargarPublicacion() {
    this.postService.getPostById(this.postId).subscribe(data => {
      this.post = data;
    });
  }

  cargarComentarios() {
    if (this.loading || !this.hasMore) return;
    this.loading = true;

    this.commentsService.getComentariosByPostId(this.postId, this.page, this.limit).subscribe(res => {
      console.log(`res: ${res}`)
      console.log(res)
      this.comentarios.push(...res.comments);
      this.hasMore = this.comentarios.length < res.total;
      this.page++;
      this.loading = false;
    });
  }

  onLike() {
    this.postService.addLike(this.postId, this.userId).subscribe({
      next: (res) => {
        console.log('Like agregado:', res)
        this.post.likes.push(this.userId); 
      },
      error: (err: HttpErrorResponse) => console.error('Error al dar like:', err)
    });
  }

  onUnlike() {
    this.postService.removeLike(this.postId, this.userId).subscribe({
      next: (res) => {
        console.log('Like quitado:', res)
        const index = this.post.likes.indexOf(this.userId);
        if (index > -1) {
          this.post.likes.splice(index, 1); // <-- Actualiza el array local
        }
      },
      error: (err: HttpErrorResponse) => console.error('Error al quitar like:', err)
    });
  }

  bajarPublicacion() {
  this.postService.softDeletePost(this.postId, this.userId).subscribe({
    next: (response) => {
    console.log('Publicación dada de baja:', response);
    this.router.navigate(['/publicaciones'])
    },
    error: (err) => {
      console.error('Error al dar de baja:', err);
      alert('No se pudo dar de baja la publicación.');
      }
    });
  }
}
