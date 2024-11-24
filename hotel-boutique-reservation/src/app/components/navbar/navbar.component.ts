import { Component, OnInit, OnDestroy } from '@angular/core'; // Importa las clases necesarias de Angular.
import { AuthService } from '../../services/auth.service'; // Importa el servicio de autenticación.
import { Router } from '@angular/router'; // Importa el router para navegar entre rutas.
import { Subscription } from 'rxjs'; // Importa Subscription para manejar la suscripción a observables.

@Component({
  selector: 'app-navbar', // Selector del componente, que se usará en el HTML.
  templateUrl: './navbar.component.html', // Ruta del archivo de plantilla HTML.
  styleUrls: ['./navbar.component.css'] // Ruta del archivo de estilos CSS.
})
export class NavbarComponent implements OnInit, OnDestroy { // Implementa OnInit y OnDestroy para gestionar ciclos de vida del componente.
  userRole: string | null = null; // Propiedad que almacenará el rol del usuario, inicializada como nula.
  private roleSubscription!: Subscription; // Suscripción privada para el observable de rol de usuario.

  constructor(public authService: AuthService, private router: Router) {} // Inyección de dependencias para AuthService y Router.

  ngOnInit(): void { // Método del ciclo de vida que se ejecuta al inicializar el componente.
    // Suscribirse al observable `userRole$` para obtener el rol del usuario
    this.roleSubscription = this.authService.userRole$.subscribe(role => {
      this.userRole = role; // Actualiza el rol del usuario cuando se emite un nuevo valor.
    });
  }

  isAuthenticated(): boolean { // Método para verificar si el usuario está autenticado.
    return this.authService.isAuthenticated(); // Devuelve el resultado del método de autenticación del servicio.
  }

  isAdmin(): boolean { // Método para verificar si el rol del usuario es 'admin'.
    return this.userRole === 'admin'; // Devuelve true si el rol es 'admin'.
  }

  isClient(): boolean { // Método para verificar si el rol del usuario es 'client'.
    return this.userRole === 'client'; // Devuelve true si el rol es 'client'.
  }

  isEmp(): boolean {
    return this.userRole === 'empleado' || this.userRole === 'admin';
  }
  
  logout() { // Método para cerrar sesión.
    this.authService.logout(); // Llama al método de logout del servicio.
    this.router.navigate(['/login']); // Redirige a la página de inicio de sesión.
  }

  ngOnDestroy(): void { // Método del ciclo de vida que se ejecuta al destruir el componente.
    this.roleSubscription.unsubscribe(); // Cancela la suscripción al observable para evitar fugas de memoria.
  }
}
