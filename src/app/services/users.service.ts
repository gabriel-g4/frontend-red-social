import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.interface';
import { environment } from '../../environments/environment.development';
import { RegisterModel } from '../models/register.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

    baseUrl = environment.URL;

    constructor(private http: HttpClient) { }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${this.baseUrl}/users`);
    }

    registerUser(userData: RegisterModel, imageFile?: File): Observable<any> {
        const formData = new FormData();
        Object.entries(userData).forEach(([key, value]) => {
            formData.append(key, value as string);
        });
        if (imageFile) {
            formData.append('imagen', imageFile);
        }
        return this.http.post(`${this.baseUrl}/users`, formData);
    }

    disableUser(userId: string): Observable<any> {
        return this.http.delete(`${this.baseUrl}/users/${userId}`);
    }

    enableUser(userId: string): Observable<any> {
        return this.http.post(`${this.baseUrl}/users/${userId}/rehabilitar`, {});
    }


}
