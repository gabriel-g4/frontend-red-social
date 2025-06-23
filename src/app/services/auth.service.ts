import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { RegisterModel } from '../models/register.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  baseUrl: string = environment.URL;

  login (email: string, password: string) : Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/auth/login`, {
        login: email,
        password
    })
  }

  register (registerModel: RegisterModel) : Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/auth/register`, 
      registerModel
    )
  }
  
}
