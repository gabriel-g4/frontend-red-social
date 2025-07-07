import { Routes } from '@angular/router';
import { jwtAuthGuard } from './guards/jwt-auth.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
    { 
        path: '',
        loadComponent: ()=> import('./components/cargando/cargando.component').then(c => c.CargandoComponent) 
    },
    {
        path: "login",
        loadComponent: ()=> import('./components/login/login.component').then(c => c.LoginComponent), 
    },
    {
        path: "mi-perfil",
        canActivate: [jwtAuthGuard],
        loadComponent: ()=> import('./components/mi-perfil/mi-perfil.component').then(c => c.MiPerfilComponent), 
    },
    {
        path: "publicaciones", 
        canActivate: [jwtAuthGuard],
        loadComponent: ()=> import('./components/publicaciones/publicaciones.component').then(c => c.PublicacionesComponent), 
    },
    {
        path: "registro", 
        loadComponent: ()=> import('./components/registro/registro.component').then(c => c.RegistroComponent), 
    },
    { 
        path: 'posts/:id', 
        canActivate: [jwtAuthGuard],
        loadComponent: ()=> import('./components/detalle-publicacion/detalle-publicacion.component').then(c => c.DetallePublicacionComponent) 
    },
    { 
        path: 'dashboard/usuarios', 
        canActivate: [adminGuard],
        loadComponent: ()=> import('./components/dashboard-usuarios/dashboard-usuarios.component').then(c => c.DashboardUsuariosComponent) 
    },
    { 
        path: 'dashboard/estadisticas', 
        canActivate: [adminGuard],
        loadComponent: ()=> import('./components/dashboard-estadisticas/dashboard-estadisticas.component').then(c => c.DashboardEstadisticasComponent) 
    },
    { 
        path: "**", 
        redirectTo: "/publicaciones", 
        pathMatch: "full"
    },
];
