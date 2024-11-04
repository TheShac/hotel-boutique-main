import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {

    const expectedRoles: string[] = route.data['rol'];
    const userRole = this.authService.getRole();

    if (!userRole || !expectedRoles.includes(userRole)) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}

