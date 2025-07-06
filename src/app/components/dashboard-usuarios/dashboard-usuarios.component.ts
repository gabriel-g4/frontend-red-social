




import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../models/user.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-usuarios',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dashboard-usuarios.component.html',
  styleUrl: './dashboard-usuarios.component.css'
})



export class DashboardUsuariosComponent implements OnInit {

  usuarios: User[] = [];
  formRegistro!: FormGroup;
  imagenSeleccionada?: File;
  mensaje: string = '';
  error: string = '';

  constructor(private usersService: UsersService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.cargarUsuarios();
    this.formRegistro = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$')]],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      tipoPerfil: ['usuario', Validators.required], // o 'administrador'
      fechaNacimiento: ['', Validators.required],
      descripcion: [''],
    });
  }

  cargarUsuarios(): void {
    this.usersService.getUsers().subscribe({
      next: (res) => this.usuarios = res,
      error: () => this.error = 'Error al cargar usuarios'
    });
  }

  onArchivoSeleccionado(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.imagenSeleccionada = input.files[0];
    }
  }

  registrarUsuario(): void {
    if (this.formRegistro.invalid) {
      this.error = 'Formulario incompleto o inválido';
      return;
    }

    this.usersService.registerUser(this.formRegistro.value, this.imagenSeleccionada).subscribe({
      next: () => {
        this.mensaje = 'Usuario registrado correctamente';
        this.error = '';
        this.formRegistro.reset();
        this.cargarUsuarios();
      },
      error: (err) => {
        this.error = 'Error al registrar: ' + (err.error?.message || 'Desconocido');
      }
    });
  }

  darDeBaja(userId: string): void {
    this.usersService.disableUser(userId).subscribe({
      next: () => this.cargarUsuarios(),
      error: () => this.error = 'Error al deshabilitar usuario'
    });
  }

  rehabilitar(userId: string): void {
    this.usersService.enableUser(userId).subscribe({
      next: () => this.cargarUsuarios(),
      error: () => this.error = 'Error al habilitar usuario'
    });
  }
}
