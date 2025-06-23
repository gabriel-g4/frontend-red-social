import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  mensaje: string = "";
  errors: ValidationErrors | null = [];

  constructor(private router: Router, private authService: AuthService) {}

  loginForm = new FormGroup({
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8) , Validators.pattern('(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$')])
  })

  async onSubmit(){

    if (this.loginForm.valid){
      try {
        console.log("valido")
        this.authService.login(this.loginForm.value.login || "err", this.loginForm.value.password || "err" )
        .subscribe({
           next: (res) => {
            console.log('Respuesta:', res);
            if (res?.status === 404) {
              console.error('Error de login:', res.message);
              this.mensaje = res.message
            } else {
              console.log('Login correcto:', res);
              this.router.navigate(["/publicaciones"])
            }
          },
          error: (err) => {
            console.error('Error de red o backend:', err);
            this.mensaje = err.message
          }
        });
        
      } catch (error) {
        if (error instanceof Error) {
            this.mensaje = error.message;
        } else {
            this.mensaje = 'Ocurrió un error desconocido';
            console.error(error)
        }
      }
    } else {
      this.mensaje = "Formulario incorrecto."
      this.loginForm.markAllAsTouched()
    }
  }
}
