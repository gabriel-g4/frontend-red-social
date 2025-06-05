import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';

export const ValidatorRepeatedPassword = (password: FormControl): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    return (password.value == control.value) ? null : { passworderror: "Las contraseñas no coinciden"};
  }
}


@Component({
  selector: 'app-registro',
  imports: [ReactiveFormsModule, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})


export class RegistroComponent implements OnInit{

  mensaje: string = "";
  userTypeOptions = ['usuario', 'administrador']

  constructor(private router: Router) {}

  registroForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), ]),
    repeatPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    date: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    profilePicture: new FormControl('', [Validators.required]),
    userType: new FormControl('', [Validators.required])
  })

  async ngOnInit() {
    this.registroForm.controls.repeatPassword.addValidators(ValidatorRepeatedPassword(this.registroForm.controls.password))
    this.registroForm.controls.repeatPassword.updateValueAndValidity();
  }
  
  async onSubmit(){

    if(this.registroForm.valid){
      try {
        let obj = this.registroForm.getRawValue()
        this.mensaje = JSON.stringify(obj)
      } catch (error){
        if (error instanceof Error) {
        this.mensaje = error.message;
      } else {
        this.mensaje = "Ocurrió un error desconocido";
      }
      }
    }
  }
}
