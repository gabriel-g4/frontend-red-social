import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../models/posts.interface';
import { PostsService } from '../../services/posts.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment.development';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-publicacion',
  imports: [RouterLink],
  templateUrl: './publicacion.component.html',
  styleUrl: './publicacion.component.css'
})
export class PublicacionComponent implements OnInit {

  constructor(private postsService: PostsService, private authService: AuthService) {}

  @Input() post!: Post;
  URL = environment.URL;
  postId = "this.post._id"
  userId = "this.authService.getUser()"
  
  ngOnInit(): void {
    if (this.post) {
      this.postId = this.post._id,
      this.userId = ""
    }
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
