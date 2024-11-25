import { Injectable } from '@angular/core'; // Decorador para servicios inyectables.
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router'; // Interfaces y servicios necesarios para proteger rutas.
import { AuthService } from './services/auth.service'; // Servicio de autenticación para obtener datos del usuario.

@Injectable({
  providedIn: 'root', // Proporciona este servicio en el nivel raíz de la aplicación.
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Método `canActivate` que determina si un usuario puede acceder a una ruta protegida.
   * @param route - Información sobre la ruta actual.
   * @returns `true` si el usuario tiene permiso, `false` de lo contrario.
   */
  canActivate(route: ActivatedRouteSnapshot): boolean {
    // Obtiene los roles esperados para acceder a la ruta desde los datos de la ruta.
    const expectedRoles: string[] = route.data['expectedRoles'];
    // Obtiene el rol del usuario actual desde el servicio de autenticación.
    const userRole = this.authService.getRole();

    console.log(expectedRoles); // Muestra los roles esperados en la consola (para depuración).

    // Si no se encuentra el rol del usuario o no coincide con los roles esperados.
    if (!userRole || !expectedRoles.includes(userRole)) {
      this.router.navigate(['/home']); // Redirige al usuario a la página de inicio.
      return false; // Niega el acceso.
    }

    return true; // Permite el acceso si el rol coincide.
  }
}
