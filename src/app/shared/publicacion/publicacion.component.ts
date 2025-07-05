import { Component, Input, OnInit } from '@angular/core';
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
  URL = environment.URL;
  
  likes = 0
  comentarios: any[] = []
  postId = ""

  
  ngOnInit(): void {
    if (this.post) {
      this.likes = this.post.likes.length
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
      next: (res) => console.log('Like agregado:', res),
      error: (err: HttpErrorResponse) => console.error('Error al dar like:', err)
    });
  }

  onUnlike() {
    this.postsService.removeLike(this.postId, this.userId).subscribe({
      next: (res) => console.log('Like quitado:', res),
      error: (err: HttpErrorResponse) => console.error('Error al quitar like:', err)
    });
  }
}
