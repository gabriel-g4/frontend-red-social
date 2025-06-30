import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private baseUrl = environment.URL;

  constructor(private httpClient: HttpClient) {}

  getComentariosByPostId(postId: string, page: number = 1, limit: number = 10): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    const url = `${this.baseUrl}/posts/${postId}/comments/`;
    return this.httpClient.get<any>(url, { params });
  }
}
