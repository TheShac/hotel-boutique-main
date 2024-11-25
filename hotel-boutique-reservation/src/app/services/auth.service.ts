import { Injectable } from '@angular/core'; // Decorador para servicios inyectables.
import { HttpClient } from '@angular/common/http'; // Servicio HTTP para realizar solicitudes al servidor.
import { Observable, of, BehaviorSubject } from 'rxjs'; // Herramientas de RxJS para manejar flujos de datos.
import { map, catchError, tap } from 'rxjs/operators'; // Operadores RxJS para transformar flujos de datos.
import { Router } from '@angular/router'; // Servicio para la navegación entre rutas.

interface LoginResponse {
  success: boolean; // Indica si la operación de inicio de sesión fue exitosa.
}

@Injectable({
  providedIn: 'root', // Proporciona este servicio en el nivel raíz de la aplicación.
})
export class AuthService {
  private apiUrl = 'http://localhost:3000'; // URL base para las solicitudes al servidor.
  private userRoleSubject = new BehaviorSubject<string | null>(null); // Observable para rastrear el rol del usuario.
  private user = {
    rol: 'rol',
    nombre: 'nombre',
    apellido: 'apellido',
    email: 'email',
  };
  userRole$ = this.userRoleSubject.asObservable(); // Observable público para escuchar cambios en el rol del usuario.

  constructor(private http: HttpClient, private router: Router) {
    const savedRole = localStorage.getItem('userRole'); // Carga el rol guardado del almacenamiento local.
    this.userRoleSubject.next(savedRole); // Establece el rol inicial.
  }

  // Método para registrar un nuevo usuario.
  register(nombre: string, apellido: string, email: string, password: string, rol: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { nombre, apellido, email, password, rol });
  }

  // Método para iniciar sesión.
  login(email: string, password: string): Observable<{ success: boolean; user?: { rol: string, nombre: string, apellido: string, email: string } }> {
    return this.http.post<{ success: boolean; user: { rol: string, nombre: string, apellido: string, email: string } }>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => {
        if (response.success && response.user?.rol) {
          this.setUserRole(response.user.rol); // Guarda el rol del usuario.
          this.setUsuario(response.user.nombre, response.user.apellido, response.user.email); // Guarda información adicional del usuario.
          
          // Redirige al usuario según su rol.
          if (response.user.rol === 'admin') {
            this.router.navigate(['/admin']);
          } else if (response.user.rol === 'emps') {
            this.router.navigate(['/home']);
          } else if (response.user.rol === 'client') {
            this.router.navigate(['/home']);
          }
        }
      }),
      catchError(() => {
        console.error('Error al iniciar sesión'); // Maneja errores de inicio de sesión.
        return of({ success: false });
      })
    );
  }

  // Establece el rol del usuario y lo guarda en el almacenamiento local.
  setUserRole(rol: string | null) {
    this.userRoleSubject.next(rol);
    if (rol) {
      localStorage.setItem('userRole', rol);
    } else {
      localStorage.removeItem('userRole');
    }
  }

  // Obtiene la información del usuario autenticado desde el almacenamiento local.
  getCurrentUser(): any {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  // Obtiene el rol del usuario actual.
  getRole(): string | null {
    return this.userRoleSubject.value;
  }

  // Verifica si el usuario está autenticado (basado en la existencia de un rol).
  isAuthenticated(): boolean {
    return !!this.getRole();
  }

  // Cierra la sesión del usuario.
  logout() {
    this.setUserRole(null);
  }

  // Establece información adicional del usuario en el almacenamiento local.
  setUsuario(nombre: string, apellido: string, email: string) {
    localStorage.setItem(this.user.nombre, nombre);
    localStorage.setItem(this.user.apellido, apellido);
    localStorage.setItem(this.user.email, email);
  }

  // Recupera la información adicional del usuario desde el almacenamiento local.
  getUsuario() {
    const nombre = localStorage.getItem(this.user.nombre);
    const apellido = localStorage.getItem(this.user.apellido);
    const email = localStorage.getItem(this.user.email);

    return {
      nombre: nombre,
      apellido: apellido,
      email: email
    };
  }
}
