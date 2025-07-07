import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RegisterModel, TipoUsuario } from '../../models/register.interface';
import { TimerService } from '../../services/timer.service';

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

  constructor(private router: Router, private authService: AuthService, private sessionTimerService: TimerService) {}

  registroForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$')]),
    repeatPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$')]),
    date: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    profilePicture: new FormControl<File | null>(null),
  })

  async ngOnInit() {
    this.registroForm.controls.repeatPassword.addValidators(ValidatorRepeatedPassword(this.registroForm.controls.password))
    this.registroForm.controls.repeatPassword.updateValueAndValidity();
  }
  
  async onSubmit(){

    if(this.registroForm.valid){
      try {
        console.log("form valido")
        
        // let obj = this.registroForm.getRawValue()
        //this.mensaje = JSON.stringify(obj)

        const registerObject: RegisterModel = {
          nombre: this.registroForm.value.name || "",
          apellido: this.registroForm.value.surname || "",
          email: this.registroForm.value.email || "",
          username: this.registroForm.value.username || "",
          password: this.registroForm.value.password || "",
          fechaNacimiento: (this.registroForm.value.date || ""),
          tipoPerfil: TipoUsuario.USER,
          imagenPerfil: this.registroForm.value.profilePicture || undefined,
          descripcion: this.registroForm.value.description || ""
        } 

        console.log(registerObject)

        this.authService.register(registerObject)
        .subscribe({
           next: (res) => {
            console.log('Respuesta:', res);
            if (res?.status === 404) {
              console.error('Error de registro:', res.message);
              this.mensaje = res.message
            } else {
              if (res?.accessToken) {
                // Guardar token JWT en localStorage
                localStorage.setItem('token', res.accessToken);
                console.log('Registro correcto. Token guardado.');
                this.authService.setLoggedIn(true);
                this.authService.setUsuarioActual(res.data.user);
                this.sessionTimerService.startTimers();
                // Redireccionar al componente protegido
                this.router.navigate(['/publicaciones']);
              } else {
                this.mensaje = res.message || "Login fallido";
              }
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
      this.registroForm.markAllAsTouched()
    }

  }
}
