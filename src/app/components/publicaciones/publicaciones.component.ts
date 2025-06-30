import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/posts.interface';
import { PostsService } from '../../services/posts.service';
import { GetPostsDto } from '../../models/get-posts-dto.interface';
import { PublicacionComponent } from '../../shared/publicacion/publicacion.component';


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

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.loadPosts();
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

  loadPosts(): void {
  const dto: GetPostsDto = {
    sortBy: this.sortBy,
    offset: this.offset,
    limit: this.limit
  };

  this.postsService.getPosts(dto).subscribe({
    next: (res) => {
      console.log('RESPUESTA:', res);
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