
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment.development';
import { Post } from '../models/posts.interface';

interface Usuario {
  _id: string;
  nombre: string;
  apellido: string;
  username: string;
}

interface Stat {
  userId: string;
  count: number;
}

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  baseUrl = environment.URL

  constructor(private http: HttpClient) {}

  obtenerUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.baseUrl + '/users');
  }

  obtenerStatsPorUsuario(fechas: any): Observable<Stat[]> {
    return this.http.post<Stat[]>(this.baseUrl + '/posts/stats/by-user', fechas);
  }

  getCommentsCountByUser(fechas: { startDate: string; endDate: string }):   Observable<Stat[]> {
    return this.http.post<Stat[]>(this.baseUrl + '/comments/stats/by-user', fechas);
  }

  obtenerDatosCompletos(fechas: any): Observable<{ label: string, count: number }[]> {
    return forkJoin([this.obtenerUsuarios(), this.obtenerStatsPorUsuario(fechas)]).pipe(
      map(([usuarios, stats]) => {
        return stats.map(stat => {
          const user = usuarios.find(u => u._id === stat.userId);
          return {
            label: user ? `@${user.username} - ${user.nombre} ${user.apellido}` : 'Desconocido',
            count: stat.count
          };
        });
      })
    );
  }

  obtenerDatosComentarios(fechas: any): Observable<{ label: string, count: number }[]> {
  return forkJoin([this.obtenerUsuarios(), this.getCommentsCountByUser(fechas)]).pipe(
    map(([usuarios, stats]) => {
      return stats.map(stat => {
        const user = usuarios.find(u => u._id === stat.userId);
        return {
          label: user ? `@${user.username} - ${user.nombre} ${user.apellido}` : 'Desconocido',
          count: stat.count
        };
      });
    })
  );
}


getCommentCountByPost(fechas: { startDate: string; endDate: string }): Observable<any[]> {
  return this.http.post<any[]>(this.baseUrl + '/comments/stats/by-post', fechas);
}

obtenerDatosComentariosPorPost(fechas: any): Observable<{ label: string, count: number }[]> {
  return forkJoin([
    this.getCommentCountByPost(fechas),
    this.http.get<{ posts: Post[]; total: number }>(this.baseUrl + '/posts?offset=0&limit=1000&sortBy=date&usuarioId=')
  ]).pipe(
    map(([stats, response]) => {
      const posts = response.posts;
      return stats.map(stat => {
        const post = posts.find(p => p._id === stat.postId);
        return {
          label: post ? "titulo: " + post.titulo  : 'Desconocido',
          count: stat.count
        };
      });
    })
  );
}


}
