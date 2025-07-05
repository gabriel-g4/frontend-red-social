import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { RegisterModel } from '../models/register.interface';
import { User } from '../models/user.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  // auth.service.ts
  private usuarioActual!: User;

  setUsuarioActual(user: User) {
    this.usuarioActual = user;
  }

  getUsuarioActual(): User {
    return this.usuarioActual;
  }


  baseUrl: string = environment.URL;

  login (email: string, password: string) : Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/auth/login`, {
        login: email,
        password
    })
  }

  register(registerModel: RegisterModel): Observable<any> {
    const formData = new FormData();

    formData.append('username', registerModel.username);
    formData.append('email', registerModel.email);
    formData.append('nombre', registerModel.nombre);
    formData.append('apellido', registerModel.apellido);
    formData.append('password', registerModel.password);
    formData.append('fechaNacimiento', registerModel.fechaNacimiento);

    if (registerModel.descripcion) {
      formData.append('descripcion', registerModel.descripcion);
    }

    // El enum debe enviarse como string
    formData.append('tipoPerfil', registerModel.tipoPerfil); // como "usuario" o "administrador"

    // Imagen (File)
    if (registerModel.imagenPerfil instanceof File) {
      formData.append('imagenPerfil', registerModel.imagenPerfil);
    }

    return this.httpClient.post(`${this.baseUrl}/auth/register`, formData);
  }

  autorizar(): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No se encontró el token en localStorage');
    }
    return this.httpClient.post(`${this.baseUrl}/auth/autorizar`, { token });
  }

  logout() {
    localStorage.clear()
  }

  
}
