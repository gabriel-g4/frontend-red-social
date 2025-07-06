import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/posts.interface';
import { PostsService } from '../../services/posts.service';
import { GetPostsDto } from '../../models/get-posts-dto.interface';
import { PublicacionComponent } from '../../shared/publicacion/publicacion.component';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-publicaciones',
  imports: [PublicacionComponent],
  templateUrl: './publicaciones.component.html',
  styleUrl: './publicaciones.component.css'
})
export class PublicacionesComponent implements OnInit {
  posts: Post[] = []
  offset = 0;
  limit = 10;
  total = 0;
  sortBy: 'date' | 'likes' = 'date';
  userId: string = "";
  isAdmin = false;
  user : any;

  constructor(private postsService: PostsService, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.autorizar().subscribe({
      next: (res) => {
        console.log(res)
        this.userId = res.data.id;
        this.user = this.authService.getUsuarioActual();
        this.isAdmin = this.user?.tipoPerfil === 'administrador'
        this.loadPosts();
      },
      error: (err) => {
        console.error('No autorizado:', err);
        this.loadPosts();
      }
    });
  }

  changeSort(sort: "likes" | "date") {
    this.sortBy = sort;
    this.posts = []
    this.total = 0
    this.offset = 0
    this.loadPosts()
  }

  onSortChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    if (value === 'date' || value === 'likes') {
      this.changeSort(value);
    }
  }

  onPublicacionEliminada(postId: string) {
  this.posts = this.posts.filter(pub => pub._id !== postId);
  this.total--;
}


  loadPosts(): void {
  const dto: GetPostsDto = {
    sortBy: this.sortBy,
    offset: this.offset,
    limit: this.limit
  };

  this.postsService.getPosts(dto).subscribe({
    next: (res) => {
      console.log('RESPUESTA:', res);
      console.log('RESPUESTA:', res.posts.map(p => ({ id: p.createdAt, likes: p.likes })));
      this.posts = [...this.posts, ...res.posts];
      this.offset += this.limit;
      this.total = res.total
    },
    error: (err) => {
      console.error('Error cargando posts:', err);
    }
  });
  }
}