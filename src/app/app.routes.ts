import { Routes } from '@angular/router';

export const routes: Routes = [
    
    {
        path: "login", 
        loadComponent: ()=> import('./components/login/login.component').then(c => c.LoginComponent), 
    },
    {
        path: "mi-perfil", 
        loadComponent: ()=> import('./components/mi-perfil/mi-perfil.component').then(c => c.MiPerfilComponent), 
    },
    {
        path: "publicaciones", 
        loadComponent: ()=> import('./components/publicaciones/publicaciones.component').then(c => c.PublicacionesComponent), 
    },
    {
        path: "registro", 
        loadComponent: ()=> import('./components/registro/registro.component').then(c => c.RegistroComponent), 
    },
    { 
        path: "**", 
        redirectTo: "/publicaciones", 
        pathMatch: "full"
    },
];
