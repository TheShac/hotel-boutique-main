import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of,BehaviorSubject } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  private userRoleSubject = new BehaviorSubject<string | null>(null);
  userRole$ = this.userRoleSubject.asObservable();

  constructor(private http: HttpClient) {
    const savedRole = localStorage.getItem('userRole');
    this.userRoleSubject.next(savedRole);
  }

  register(email: string, password: string, rol: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { email, password, rol });
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      
      tap(response => {
        if (response && response.user && response.user.rol) {
          this.setUserRole(response.user.rol);
          }
      }),
      
      map(response => !!response.user),
      catchError(() => of(false))
    );
  }

  setUserRole(rol: string | null) {
    this.userRoleSubject.next(rol);
    if (rol ) {
      localStorage.setItem('userRole', rol);
    } else {
      localStorage.removeItem('userRole');
    }
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
}
