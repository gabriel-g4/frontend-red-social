import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  mensaje: string = "";
  errors: ValidationErrors | null = [];

  constructor(private router: Router) {}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8) , Validators.pattern('(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$')])
  })

  async onSubmit(){

    if (this.loginForm.valid){
      try {
        console.log("valido")
        this.mensaje = ""
      } catch (error) {
        
      }
    } else {
      this.mensaje = "Formulario incorrecto."
      this.loginForm.markAllAsTouched()
    }
  }
}
