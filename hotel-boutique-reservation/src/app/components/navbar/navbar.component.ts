import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userRole: string | null = null;
  private roleSubscription!: Subscription;

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Suscribirse al observable `userRole$` para obtener el rol del usuario
    this.roleSubscription = this.authService.userRole$.subscribe(role => {
      this.userRole = role;
    });
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  isAdmin(): boolean {
    return this.userRole === 'admin';
  }

  isClient(): boolean {
    return this.userRole === 'client';
  }
  
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.roleSubscription.unsubscribe();
  }
}
