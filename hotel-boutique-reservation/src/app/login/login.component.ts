import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Inicializar el formulario con validaciones
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  // Función para mostrar errores en el campo email
  get emailError() {
    const emailControl = this.loginForm.get('email');
    return emailControl?.invalid && (emailControl?.touched || emailControl?.dirty);
  }

  // Función para mostrar errores en el campo password
  get passwordError() {
    const passwordControl = this.loginForm.get('password');
    return passwordControl?.invalid && (passwordControl?.touched || passwordControl?.dirty);
  }

  // Manejo del envío del formulario
  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value;

    // Llamada al servicio de autenticación
    this.authService.login(email, password).subscribe(
      (response) => {
        if (response.success) {
          const rol = response.user?.rol;
          const nombre = response.user?.nombre;
          const apellido = response.user?.apellido;
          const email = response.user?.email;

          switch (rol) {
            case 'admin':
              this.router.navigate(['/admin']);
              break;
            case 'emps':
              this.router.navigate(['/perfil']);
              break;
            case 'client':
              this.router.navigate(['/home']);
              break;
            default:
              this.router.navigate(['/home']);
          }          
        }
        else {
          alert('Credenciales incorrectas');
        }
      },
      (error) => {
        console.error('Error en el inicio de sesión:', error);
        alert('Error en el inicio de sesión. Verifica tus credenciales.');
      }
    );

  }
}
