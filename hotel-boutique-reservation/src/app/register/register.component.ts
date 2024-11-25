import { Component } from '@angular/core'; // Importa el decorador para definir el componente.
import { Router } from '@angular/router'; // Importa el servicio de enrutamiento de Angular.
import { AuthService } from '../services/auth.service'; // Servicio para manejar la autenticación de usuarios.
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Herramientas para formularios reactivos en Angular.

@Component({
  selector: 'app-register', // Nombre del componente.
  templateUrl: './register.component.html', // Archivo HTML del componente.
  styleUrls: ['./register.component.css'] // Archivo CSS del componente.
})
export class RegisterComponent {
  nombre: string = ''; // Propiedad para almacenar el nombre del usuario.
  apellido: string = ''; // Propiedad para almacenar el apellido del usuario.
  email: string = ''; // Propiedad para almacenar el correo electrónico del usuario.
  password: string = ''; // Propiedad para almacenar la contraseña del usuario.
  role: string = 'client'; // Propiedad para almacenar el rol del usuario, predeterminado 'client'.

  constructor(
    private fb: FormBuilder, // Inyecta el FormBuilder para crear formularios reactivos.
    private authService: AuthService, // Inyecta el servicio de autenticación.
    private router: Router // Inyecta el servicio de enrutamiento.
  ) {}

  // Método para registrar un nuevo usuario.
  register() {
    if (!this.nombre || !this.apellido || !this.email || !this.password) {
      alert('Por favor, complete todos los campos.');
      return;
    }
    if (this.password.length < 8) {
      alert('La contraseña debe tener al menos 8 caracteres.');
      return;
    }
  
    this.authService.register(this.nombre, this.apellido, this.email, this.password, this.role).subscribe(
      (response) => {
        alert('Usuario registrado con éxito');
        this.router.navigate(['/login']);
      },
      (error) => {
        alert('Error al registrar usuario');
        console.error(error);
      }
    );
  }
}