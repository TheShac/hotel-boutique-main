import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get emailError() {
    const emailControl = this.loginForm.get('email');
    return emailControl?.invalid && (emailControl?.touched || emailControl?.dirty);
  }

  get passwordError() {
    const passwordControl = this.loginForm.get('password');
    return passwordControl?.invalid && (passwordControl?.touched || passwordControl?.dirty);
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe(
      (response) => {
        if (response.success) {
          const role = response.user.role;
          this.router.navigate([role === 'admin' ? '/admin' : '/perfil']);
        }
      },
      (error) => {
        if (error.status === 400 && error.error.field === 'email') {
          this.loginForm.get('email')?.setErrors({ incorrect: true });
        } else if (error.status === 401 && error.error.field === 'password') {
          this.loginForm.get('password')?.setErrors({ incorrect: true });
        } else {
          alert('Error desconocido al iniciar sesión');
        }
      }
    );
  }
}

