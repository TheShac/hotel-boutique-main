import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError = '';

  constructor(
    private authService: AuthService, 
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  login() {
    if (this.loginForm.valid){
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(isAuthenticated => {
        if (isAuthenticated) {
          const role = this.authService.getRole();
          this.router.navigate([role === 'admin' ? '/admin' : '/perfil']);
        } 
        else {
          this.loginError = 'Correo o contraseña incorrectos';
          this.setFieldErrors();
        }
      });
    }
  }

  private setFieldErrors(){
    if(!this.loginForm.get('email')?.valid){
      this.loginForm.get('email')?.setErrors({ incorrect: true});
    }
    if(!this.loginForm.get('password')?.valid){
      this.loginForm.get('password')?.setErrors({ incorrect: true});
    }
  }
}
