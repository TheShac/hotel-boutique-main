import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of,BehaviorSubject } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

interface LoginResponse {
  success: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  private userRoleSubject = new BehaviorSubject<string | null>(null);
  
 private user = {
    rol: 'rol',
    nombre: 'nombre',
    apellido: 'apellido',
    email: 'email',
  };
  userRole$ = this.userRoleSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    const savedRole = localStorage.getItem('userRole');
    this.userRoleSubject.next(savedRole);
  }

  register(nombre: string, apellido: string, email: string, password: string, rol: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { nombre, apellido, email, password, rol });
  }

  login(email: string, password: string): Observable<{ success: boolean; user?: { rol: string, nombre: string, apellido: string, email: string  } }> {
    return this.http.post<{ success: boolean; user: { rol: string , nombre: string, apellido: string, email: string  } }>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => {
        if (response.success && response.user?.rol) {

          this.setUserRole(response.user.rol);          
          this.setUsuario(response.user.nombre, response.user.apellido, response.user.email);
          
          if(response.user.rol === 'admin'){
            this.router.navigate(['/admin']);
          }
          else if(response.user.rol === 'emps'){
            this.router.navigate(['/home']);
          }
          else if(response.user.rol === 'client'){
            this.router.navigate(['/home']);
          }
        }
      }),
      catchError(() => {
        console.error('Error al iniciar sesión');
        return of({ success: false });
      })
    );
  }

  setUserRole(rol: string | null) {
    this.userRoleSubject.next(rol);
    if (rol ) {
      localStorage.setItem('userRole', rol);
    } 
    else {
      localStorage.removeItem('userRole');
    }
  }
  
  getCurrentUser(): any {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  getRole(): string | null {
    return this.userRoleSubject.value; // Obtener el valor actual sincrónicamente
  }

  isAuthenticated(): boolean {
    return !!this.getRole(); // Retorna true si hay un rol, indicando autenticación
  }
  
  logout() {
    this.setUserRole(null);
  }

  setUsuario(nombre: string, apellido: string, email: string){
    localStorage.setItem(this.user.nombre , nombre);
    localStorage.setItem(this.user.apellido , apellido);
    localStorage.setItem(this.user.email , email);
  }

  getUsuario(){
    const nombre = localStorage.getItem(this.user.nombre);
    const apellido = localStorage.getItem(this.user.apellido);
    const email = localStorage.getItem(this.user.email );

    return {
      nombre: nombre,
      apellido: apellido,
      email: email
    }; 
  }
}
