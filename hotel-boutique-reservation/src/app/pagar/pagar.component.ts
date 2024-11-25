import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-pagar',
  templateUrl: './pagar.component.html',
  styleUrls: ['./pagar.component.css']
})
export class PagarComponent {
  cardNumber: string = ''; // Número de tarjeta
  cardholderName: string = ''; // Nombre del titular
  cardMonth: string = ''; // Mes de expiración
  cardYear: string = ''; // Año de expiración
  cvv: string = ''; // Código CVV
  flipped: boolean = false; // Control de giro de la tarjeta
  serviciosSeleccionados: any = []; // Servicios seleccionados
  habitacionId: number | null = null; // ID de la habitación
  monto: number = 0; // Monto de la reserva

  constructor(private router: Router, private http: HttpClient, private authService: AuthService ) {}

  // Alterna el giro de la tarjeta
  toggleCard(): void {
    this.flipped = !this.flipped;
  }

  // Permite solo dígitos en el número de tarjeta
  allowOnlyDigits(event: KeyboardEvent): void {
    const charCode = event.key.charCodeAt(0);
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  // Actualiza el número de tarjeta
  updateCardNumber(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, '');
    this.cardNumber = value.slice(0, 16);
  }

  // Permite solo letras en el nombre
  allowOnlyLetters(event: KeyboardEvent): void {
    const charCode = event.key.charCodeAt(0);
    if (
      !(charCode >= 65 && charCode <= 90) &&
      !(charCode >= 97 && charCode <= 122) &&
      charCode !== 32
    ) {
      event.preventDefault();
    }
  }

  // Actualiza el nombre del titular
  updateCardName(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.cardholderName = input.value.replace(/[^a-zA-Z\s]/g, '');
  }

  // Permite solo números en el CVV
  allowOnlyNumbersForCvv(event: KeyboardEvent): void {
    const charCode = event.key.charCodeAt(0);
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  // Actualiza el CVV
  updateCvv(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.cvv = input.value.replace(/[^0-9]/g, '').slice(0, 3);
  }

  // Devuelve los años disponibles para la tarjeta
  getCardYears(): number[] {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 10 }, (_, i) => currentYear + i);
  }

  // Lógica para guardar la reserva
  guardarReserva(): void {
    if (
      this.cardNumber &&
      this.cardholderName &&
      this.cardMonth &&
      this.cardYear &&
      this.cvv
    ) {
      const reserva = {
        habitacion_id: this.habitacionId,
        servicios_adicionales: this.serviciosSeleccionados,
        monto: this.monto,
        tarjeta_nombre: this.cardholderName,
        tarjeta_expiracion: `${this.cardMonth}/${this.cardYear}`,
        tarjeta_numero: this.cardNumber
      };

      // Llama al backend para guardar la reserva
      this.http.post('http://localhost:3000/api/reservas', reserva).subscribe(
        () => {
          alert('Reserva realizada con éxito');
          this.router.navigate(['/catalogo']);
        },
        (error) => {
          alert('Error al realizar la reserva');
          console.error(error);
        }
      );
    } else {
      alert('Por favor, complete todos los campos.');
    }
  }
}
    