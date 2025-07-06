import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { GetPostsDto } from '../models/get-posts-dto.interface';
import { Observable } from 'rxjs';
import { Post } from '../models/posts.interface';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private httpClient: HttpClient) { }
  
  baseUrl: string = environment.URL

  getPostById(postId: string): Observable<Post> {
    const url = `${this.baseUrl}/posts/${postId}`;
    return this.httpClient.get<Post>(url);
  }

  softDeletePost(postId: string, userId: string): Observable<any> {
    const url = `${this.baseUrl}/posts/${postId}`; 
    const headers = new HttpHeaders().set('userId', userId);
    return this.httpClient.delete(url, { headers });
  }

  getPosts(getPostsDto: GetPostsDto): Observable<{ posts: Post[], total: number }> {
    let params = new HttpParams();

    if (getPostsDto.sortBy) params = params.set('sortBy', getPostsDto.sortBy);
    if (getPostsDto.usuarioId) params = params.set('usuarioId', getPostsDto.usuarioId);
    if (getPostsDto.offset != null) params = params.set('offset', getPostsDto.offset.toString());
    if (getPostsDto.limit != null) params = params.set('limit', getPostsDto.limit.toString());

    return this.httpClient.get<{ posts: Post[], total: number }>(`${this.baseUrl}/posts`, { params });
    
  }

  addLike(postId: string, userId: string): Observable<any> {
    const url = `${this.baseUrl}/posts/${postId}/like`;
    const headers = new HttpHeaders().set('userId', userId);
    return this.httpClient.post(url, {}, { headers });
  }

  removeLike(postId: string, userId: string): Observable<any> {
    const url = `${this.baseUrl}/posts/${postId}/like`;
    const headers = new HttpHeaders().set('userId', userId);
    return this.httpClient.delete(url, { headers });
  }
}

 


  

