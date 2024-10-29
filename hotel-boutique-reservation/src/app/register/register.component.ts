import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  registrationError = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ){
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  register(){
    if(this.registerForm){
      const { email, password } = this.registerForm.value;

      this.authService.register(email, password, 'client').subscribe({
        next: () => this.router.navigate(['/login']),
        error: () => this.registrationError = 'Error al registrar el usuario. Intente nuevamente.'
      });
    }
  }
}

