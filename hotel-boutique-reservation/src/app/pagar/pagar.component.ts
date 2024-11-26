import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

interface Reserva {
  habitacion: {
    id: number;
    nombre: string;
    precio: number;
  };
  servicios: string[];
}

@Component({
  selector: 'app-pagar',
  templateUrl: './pagar.component.html',
  styleUrls: ['./pagar.component.css']
})
export class PagarComponent implements OnInit {
  cardNumber: string = '';
  cardholderName: string = '';
  cardMonth: string = '';
  cardYear: string = '';
  cvv: string = '';
  flipped: boolean = false;
  serviciosSeleccionados: string[] = [];
  habitacionId: number | null = null;
  monto: number = 0;
  habitacionNombre: string = '';
  fechaInicio: string = '';
  fechaTermino: string = '';

  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const reservaData = localStorage.getItem('reserva');
    this.fechaInicio = localStorage.getItem('fechaInicio') || '';
    this.fechaTermino = localStorage.getItem('fechaTermino') || '';

    if (!reservaData || !this.fechaInicio || !this.fechaTermino) {
      this.router.navigate(['/catalogo']);
      return;
    }

    try {
      const reserva: Reserva = JSON.parse(reservaData);
      this.habitacionId = reserva.habitacion.id;
      this.habitacionNombre = reserva.habitacion.nombre;
      this.serviciosSeleccionados = reserva.servicios;
      this.monto = reserva.habitacion.precio;
    } catch (error) {
      this.router.navigate(['/catalogo']);
    }
  }

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

  procesarPago(): void {
    if (this.validarFormulario()) {
      const usuario = this.authService.getCurrentUser();
      
      if (!usuario) {
        Swal.fire({
          title: 'Error!',
          text: 'Debe iniciar sesión para realizar una reserva',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
        return;
      }

      const fechaInicio = localStorage.getItem('fechaInicio');
      const fechaTermino = localStorage.getItem('fechaTermino');

      if (!fechaInicio || !fechaTermino) {
        Swal.fire({
          title: 'Error!',
          text: 'Las fechas de reserva son requeridas',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
        return;
      }

      const reserva = {
        usuario_id: usuario.id,
        habitacion_id: this.habitacionId,
        tarjeta_ultimos4: this.cardNumber.slice(-4),
        tarjeta_nombre: this.cardholderName,
        tarjeta_expiracion: `${this.cardMonth}/${this.cardYear}`,
        monto: Number(this.monto),
        servicios_adicionales: JSON.stringify(this.serviciosSeleccionados),
        fecha_inicio: fechaInicio,
        fecha_termino: fechaTermino
      };

      this.http.post('http://localhost:3000/api/reservas', reserva)
        .subscribe({
          next: (response: any) => {
            Swal.fire({
              title: 'Éxito!',
              text: 'Reserva realizada con éxito',
              icon: 'success',
              confirmButtonText: 'Ok'
            }).then(() => {
              localStorage.removeItem('reserva');
              localStorage.removeItem('fechaInicio');
              localStorage.removeItem('fechaTermino');
              this.router.navigate(['/catalogo']);
            });
          },
          error: (error) => {
            Swal.fire({
              title: 'Error!',
              text: error.error?.message || 'Error al procesar la reserva',
              icon: 'error',
              confirmButtonText: 'Ok'
            });
          }
        });
    }
  }

  validarFormulario(): boolean {
    if (!this.cardNumber || !this.cardholderName || !this.cardMonth || !this.cardYear || !this.cvv) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor complete todos los campos de la tarjeta',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      return false;
    }

    if (this.cardNumber.length !== 16) {
      Swal.fire({
        title: 'Error',
        text: 'El número de tarjeta debe tener 16 dígitos',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      return false;
    }

    if (this.cvv.length !== 3) {
      Swal.fire({
        title: 'Error',
        text: 'El CVV debe tener 3 dígitos',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      return false;
    }

    return true;
  }

  calcularNoches(): number {
    if (!this.fechaInicio || !this.fechaTermino) return 0;
    const inicio = new Date(this.fechaInicio);
    const fin = new Date(this.fechaTermino);
    const diferencia = fin.getTime() - inicio.getTime();
    return Math.ceil(diferencia / (1000 * 3600 * 24));
  }

  calcularTotalServicios(): number {
    // Aquí puedes definir el precio de cada servicio
    const preciosServicios: { [key: string]: number } = {
      'Tratamientos de Spa': 50000,
      'Cenas Privadas': 35000,
      'Transporte': 25000
    };

    return this.serviciosSeleccionados.reduce((total, servicio) => {
      return total + (preciosServicios[servicio] || 0);
    }, 0);
  }

  calcularTotal(): number {
    const totalHabitacion = this.monto * this.calcularNoches();
    const totalServicios = this.calcularTotalServicios();
    return totalHabitacion + totalServicios;
  }
}
    