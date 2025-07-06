import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from '../../models/posts.interface';
import { PostsService } from '../../services/posts.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment.development';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CommentsService } from '../../services/comments.service';


@Component({
  selector: 'app-publicacion',
  imports: [RouterLink, CommonModule],
  templateUrl: './publicacion.component.html',
  styleUrl: './publicacion.component.css'
})
export class PublicacionComponent implements OnInit {

  constructor(private postsService: PostsService, private commentsService: CommentsService) {}

  @Input() post!: Post;
  @Input() userId!: string
  @Input() isAdmin!: boolean;
  @Output() eliminada = new EventEmitter<string>();
  URL = environment.URL;
  
  comentarios: any[] = []
  postId = ""

  
  ngOnInit(): void {
    if (this.post) {
      this.postId = this.post._id;
      this.cargarComentarios();
    }
  }

  cargarComentarios() {
    this.commentsService.getComentariosByPostId(this.postId, 1, 3).subscribe(res => {
      this.comentarios.push(...res.comments);
    })
  }
  
  onLike() {
    this.postsService.addLike(this.postId, this.userId).subscribe({
      next: (res) => {
        console.log('Like agregado:', res)
         this.post.likes.push(this.userId); // <-- Actualiza el array local
      },
      error: (err: HttpErrorResponse) => console.error('Error al dar like:', err)
    });
  }

  onUnlike() {
    this.postsService.removeLike(this.postId, this.userId).subscribe({
      next: (res) => {
        console.log('Like quitado:', res);
        const index = this.post.likes.indexOf(this.userId);
        if (index > -1) {
          this.post.likes.splice(index, 1); // <-- Actualiza el array local
        }
      },
      error: (err: HttpErrorResponse) => console.error('Error al quitar like:', err)
    });
  }

 bajarPublicacion() {
  this.postsService.softDeletePost(this.postId, this.userId).subscribe({
    next: (response) => {
    console.log('Publicación dada de baja:', response);
    this.eliminada.emit(this.postId);
    },
    error: (err) => {
      console.error('Error al dar de baja:', err);
      alert('No se pudo dar de baja la publicación.');
      }
    });
  }
}
