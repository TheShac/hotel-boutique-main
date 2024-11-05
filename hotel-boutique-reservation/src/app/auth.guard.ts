import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {

    const expectedRoles: string[] = route.data['expectedRoles'];
    const userRole = this.authService.getRole();
    console.log(expectedRoles);
    
    if (!userRole || !expectedRoles.includes(userRole)) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
}
