import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-habitacion-detalle',
  templateUrl: './habitacion-detalle.component.html',
  styleUrls: ['./habitacion-detalle.component.css'],
})
export class HabitacionDetalleComponent implements OnInit {
  habitacion: any = null;
  userId: number | null = null; // ID del usuario autenticado
  serviciosSeleccionados: string[] = [];
  fechaInicio: string = '';
  fechaTermino: string = '';
  fechaMinima: string;
  fechaMinimaSalida: string;
  fechaMaxima: string;

  // Objeto para manejar el estado de los checkboxes
  serviciosCheck = {
    spa: false,
    cenas: false,
    transporte: false
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private authService: AuthService
  ) {
    // Establecer fecha mínima como hoy
    const hoy = new Date();
    this.fechaMinima = hoy.toISOString().split('T')[0];
    this.fechaMinimaSalida = this.fechaMinima;

    // Establecer fecha máxima como 31/12/2025
    const fechaMaxima = new Date(2025, 11, 31); // Mes 11 es Diciembre (0-based)
    this.fechaMaxima = fechaMaxima.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    const habitacionId = this.route.snapshot.paramMap.get('id');

    if (habitacionId) {
      this.http.get(`http://localhost:3000/api/habitaciones/${habitacionId}`).subscribe(
        (response: any) => {
          if (response) {
            this.habitacion = response;
          } else {
            console.error('Datos de la habitación no encontrados en el backend.');
          }
        },
        (error) => {
          console.error('Error al obtener la información de la habitación desde el backend:', error);
        }
      );
    } else {
      console.error('El ID de la habitación no es válido.');
    }
  }

  actualizarFechaMinimaSalida() {
    if (this.fechaInicio) {
      // Validar que la fecha de inicio no sea anterior a hoy
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);
      const fechaInicioObj = new Date(this.fechaInicio);
      
      if (fechaInicioObj < hoy) {
        alert('La fecha de inicio no puede ser anterior a hoy');
        this.fechaInicio = this.fechaMinima;
        return;
      }

      // Establecer fecha mínima de salida como el día siguiente a la fecha de inicio
      fechaInicioObj.setDate(fechaInicioObj.getDate() + 1);
      this.fechaMinimaSalida = fechaInicioObj.toISOString().split('T')[0];
      
      // Si la fecha de término es menor que la nueva fecha mínima, actualizarla
      if (this.fechaTermino && this.fechaTermino < this.fechaMinimaSalida) {
        this.fechaTermino = this.fechaMinimaSalida;
      }
    }
  }

  validarFechas(): boolean {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const fechaInicioObj = new Date(this.fechaInicio);
    const fechaTerminoObj = new Date(this.fechaTermino);
    const fechaMaximaObj = new Date(2025, 11, 31);

    if (fechaInicioObj < hoy) {
      alert('La fecha de inicio no puede ser anterior a hoy');
      return false;
    }

    if (fechaTerminoObj <= fechaInicioObj) {
      alert('La fecha de término debe ser posterior a la fecha de inicio');
      return false;
    }

    if (fechaTerminoObj > fechaMaximaObj) {
      alert('La fecha de término no puede ser posterior al 31/12/2025');
      return false;
    }

    return true;
  }

  actualizarServicios(servicio: string, checked: boolean) {
    if (checked) {
      if (!this.serviciosSeleccionados.includes(servicio)) {
        this.serviciosSeleccionados.push(servicio);
      }
    } else {
      const index = this.serviciosSeleccionados.indexOf(servicio);
      if (index > -1) {
        this.serviciosSeleccionados.splice(index, 1);
      }
    }
  }

  irAPagar(): void {
    if (!this.estaDisponible()) {
      alert('Lo sentimos, esta habitación no está disponible');
      return;
    }

    if (!this.fechaInicio || !this.fechaTermino) {
      alert('Por favor seleccione las fechas de reserva');
      return;
    }

    if (!this.validarFechas()) {
      return;
    }

    // Guardar las fechas en localStorage
    localStorage.setItem('fechaInicio', this.fechaInicio);
    localStorage.setItem('fechaTermino', this.fechaTermino);

    const reserva = {
      habitacion: {
        id: this.habitacion.id,
        nombre: this.habitacion.nombre,
        precio: this.habitacion.precio
      },
      servicios: this.serviciosSeleccionados,
      fechaInicio: this.fechaInicio,
      fechaTermino: this.fechaTermino
    };

    localStorage.setItem('reserva', JSON.stringify(reserva));
    
    this.router.navigate(['/pagar']);
  }

  // Método para verificar si la habitación está disponible
  estaDisponible(): boolean {
    return this.habitacion && this.habitacion.disponibilidad > 0;
  }

  reservarHabitacion(): void {
    if (this.habitacion && this.habitacion.disponibilidad > 0) {
      const user = this.authService.getCurrentUser();

      const serviciosSeleccionados = Object.entries(this.serviciosSeleccionados)
        .filter(([_, value]) => value)
        .map(([key]) => {
          if (key === 'spa') return 'Tratamientos de Spa';
          if (key === 'cenas') return 'Cenas Privadas';
          if (key === 'transporte') return 'Transporte';
          return '';
        })
        .filter((servicio) => servicio !== '');

      const reserva = {
        usuario_id: user?.id,
        habitacion_id: this.habitacion.id,
        servicios_adicionales: serviciosSeleccionados,
      };

      this.http.post('http://localhost:3000/api/reservas', reserva).subscribe(
        (response: any) => {
          alert('Reserva realizada con éxito');
           localStorage.removeItem('reserva'); 
          this.habitacion.disponibilidad--;
        },
        (error) => {
          alert(
            `Error al realizar la reserva: ${error.error.message || 'Error desconocido'}`
          );
          if (error.error.disponibilidad_actual !== undefined) {
            this.habitacion.disponibilidad = error.error.disponibilidad_actual;
          }
        }
      );
    } else {
      alert('No hay disponibilidad para reservar esta habitación');
    }
  }

  volverAlCatalogo(): void {
    this.router.navigate(['/catalogo']);
  }
}
