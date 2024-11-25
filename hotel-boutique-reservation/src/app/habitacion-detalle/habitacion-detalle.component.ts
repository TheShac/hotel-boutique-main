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
  habitacion: any;
  userId: number | null = null; // ID del usuario autenticado
  serviciosSeleccionados = {
    spa: false,
    cenas: false,
    transporte: false,
  };

  habitaciones = [
    {
      id: 1,
      nombre: 'Habitación Estandar',
      descripcion: 'Amplia habitación ideal para familias.',
      precio: 120000,
      disponibilidad: 5,
      imagenUrl: 'https://www.ahstatic.com/photos/b5w1_rodbcovz_00_p_1024x768.jpg',
      fotos: [
        'https://www.ahstatic.com/photos/b5w1_rodbcovz_03_p_1024x768.jpg',
        'https://www.ahstatic.com/photos/b5w1_rodbcovz_04_p_1024x768.jpg',
        'https://www.ahstatic.com/photos/b5w1_rodbcovz_05_p_1024x768.jpg',
      ],
    },
    // Otras habitaciones omitidas por simplicidad
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const habitacionId = this.route.snapshot.paramMap.get('id');

    if (habitacionId) {
      this.http.get(`http://localhost:3000/api/habitaciones/${habitacionId}`).subscribe(
        (response: any) => {
          if (response) {
            this.habitacion = response;

            if (!this.habitacion.fotos || this.habitacion.fotos.length === 0) {
              this.habitacion.fotos = this.habitaciones.find(
                (h) => h.id === Number(habitacionId)
              )?.fotos || [];
            }
          } else {
            console.error('Datos de la habitación no encontrados en el backend.');
          }
        },
        (error) => {
          console.error('Error al obtener la información de la habitación desde el backend:', error);

          this.habitacion = this.habitaciones.find(
            (h) => h.id === Number(habitacionId)
          );

          if (!this.habitacion) {
            console.error('Habitación no encontrada en los datos locales.');
          }
        }
      );
    } else {
      console.error('El ID de la habitación no es válido.');
    }
  }

  irAPagar(): void {
    const serviciosSeleccionados = Object.entries(this.serviciosSeleccionados)
      .filter(([_, value]) => value)
      .map(([key]) => {
        if (key === 'spa') return 'Tratamientos de Spa';
        if (key === 'cenas') return 'Cenas Privadas';
        if (key === 'transporte') return 'Transporte';
        return '';
      })
      .filter((servicio) => servicio !== '');

    this.router.navigate(['/pagar'], {
      state: {
        servicios: serviciosSeleccionados,
        habitacion: this.habitacion,
      },
    });
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
