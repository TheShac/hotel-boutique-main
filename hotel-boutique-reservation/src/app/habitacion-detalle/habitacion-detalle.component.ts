import { Component, OnInit } from '@angular/core'; // Decorador y ciclo de vida principal de Angular.
import { ActivatedRoute, Router } from '@angular/router'; // Herramientas para navegación y parámetros de ruta.
import { HttpClient } from '@angular/common/http'; // Servicio para realizar solicitudes HTTP.
import { AuthService } from '../services/auth.service'; // Servicio de autenticación.

@Component({
  selector: 'app-habitacion-detalle', // Selector del componente.
  templateUrl: './habitacion-detalle.component.html', // Ruta de la plantilla HTML asociada.
  styleUrls: ['./habitacion-detalle.component.css'], // Ruta del archivo CSS asociado.
})
export class HabitacionDetalleComponent implements OnInit {
  habitacion: any; // Objeto que almacena los detalles de la habitación seleccionada.
  userId: number | null = null; // ID del usuario autenticado (inicialmente `null`).

  // Lista de habitaciones con datos predefinidos.
  habitaciones = [
    // Ejemplo de habitaciones con detalles (id, nombre, descripción, precio, disponibilidad, imagen, fotos adicionales).
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
        'https://www.ahstatic.com/photos/b5w1_rodbcovz_05_p_1024x768.jpg'
      ]
    },
    {
      id: 2,
      nombre: 'Habitación Twin',
      descripcion: 'Habitación acogedora con dos camas individuales.',
      precio: 119990,
      disponibilidad: 5,
      imagenUrl: 'https://www.ahstatic.com/photos/b5w1_rod3cov_00_p_1024x768.jpg',
      fotos: [
        'https://www.ahstatic.com/photos/b5w1_rod3cov_01_p_1024x768.jpg',
        'https://www.ahstatic.com/photos/b5w1_rod3cov_02_p_1024x768.jpg'
      ]
    },
    {
      id: 3,
      nombre: 'Habitación Superior',
      descripcion: 'Habitación de lujo con vistas espectaculares.',
      precio: 159990,
      disponibilidad: 5,
      imagenUrl: 'https://www.ahstatic.com/photos/b5w1_rodbbofz_00_p_1024x768.jpg',
      fotos: [
        'https://www.ahstatic.com/photos/b5w1_rodbbofz_01_p_1024x768.jpg',
        'https://www.ahstatic.com/photos/b5w1_rodbbofz_02_p_1024x768.jpg'
      ]
    },
    {
      id: 4,
      nombre: 'Habitación Ejecutiva',
      descripcion: 'Habitación con vista panorámica y baño privado.',
      precio: 129990,
      disponibilidad: 5,
      imagenUrl: 'https://www.ahstatic.com/photos/b5w1_rodbaofz_00_p_1024x768.jpg',
      fotos: [
        'https://www.ahstatic.com/photos/b5w1_rodbaofz_01_p_1024x768.jpg',
        'https://www.ahstatic.com/photos/b5w1_rodbaofz_02_p_1024x768.jpg',
        'https://www.ahstatic.com/photos/b5w1_rodbaofz_03_p_1024x768.jpg'
      ]
    },
    {
      id: 5,
      nombre: 'Habitación Familiar',
      descripcion: 'Amplia habitación ideal para familias grandes.',
      precio: 129990,
      disponibilidad: 10,
      imagenUrl: 'https://www.ahstatic.com/photos/b5w1_rodbcovz_00_p_1024x768.jpg',
      fotos: [
        'https://www.ahstatic.com/photos/b5w1_rodbcovz_03_p_1024x768.jpg',
        'https://www.ahstatic.com/photos/b5w1_rodbcovz_04_p_1024x768.jpg',
        'https://www.ahstatic.com/photos/b5w1_rodbcovz_05_p_1024x768.jpg'
      ]
    },
    {
      id: 6,
      nombre: 'Habitación Suite Deluxe',
      descripcion: 'Suite de lujo con servicios premium.',
      precio: 189990,
      disponibilidad: 3,
      imagenUrl: 'https://www.ahstatic.com/photos/b5w1_rod3cov_00_p_1024x768.jpg',
      fotos: [
        'https://www.ahstatic.com/photos/b5w1_rod3cov_01_p_1024x768.jpg',
        'https://www.ahstatic.com/photos/b5w1_rod3cov_02_p_1024x768.jpg'
      ]
    },
    {
      id: 7,
      nombre: 'Habitación Junior Suite',
      descripcion: 'Cómoda habitación con diseño moderno.',
      precio: 179990,
      disponibilidad: 4,
      imagenUrl: 'https://www.ahstatic.com/photos/b5w1_rodbbofz_00_p_1024x768.jpg',
      fotos: [
        'https://www.ahstatic.com/photos/b5w1_rodbbofz_01_p_1024x768.jpg',
        'https://www.ahstatic.com/photos/b5w1_rodbbofz_02_p_1024x768.jpg'
      ]
    },
    {
      id: 8,
      nombre: 'Habitación Premium',
      descripcion: 'Habitación exclusiva con servicios personalizados.',
      precio: 199990,
      disponibilidad: 2,
      imagenUrl: 'https://www.ahstatic.com/photos/b5w1_rodbaofz_00_p_1024x768.jpg',
      fotos: [
        'https://www.ahstatic.com/photos/b5w1_rodbaofz_01_p_1024x768.jpg',
        'https://www.ahstatic.com/photos/b5w1_rodbaofz_02_p_1024x768.jpg',
        'https://www.ahstatic.com/photos/b5w1_rodbaofz_03_p_1024x768.jpg'
      ]
    },
    {
      id: 9,
      nombre: 'Habitación Doble Confort',
      descripcion: 'Habitación ideal para parejas.',
      precio: 159990,
      disponibilidad: 3,
      imagenUrl: 'https://www.ahstatic.com/photos/b5w1_rodbcovz_01_p_1024x768.jpg',
      fotos: [
        'https://www.ahstatic.com/photos/b5w1_rodbcovz_02_p_1024x768.jpg',
        'https://www.ahstatic.com/photos/b5w1_rodbcovz_06_p_1024x768.jpg'
      ]
    },
    {
      id: 10,
      nombre: 'Habitación Individual Económica',
      descripcion: 'Habitación ideal para viajeros individuales.',
      precio: 69990,
      disponibilidad: 8,
      imagenUrl: 'https://www.ahstatic.com/photos/b5w1_rodsolo_00_p_1024x768.jpg',
      fotos: [
        'https://www.ahstatic.com/photos/b5w1_rodsolo_01_p_1024x768.jpg',
        'https://www.ahstatic.com/photos/b5w1_rodsolo_02_p_1024x768.jpg'
      ]
    }
  ];

  // Constructor que inyecta servicios necesarios.
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private authService: AuthService // Inyecta AuthService
  ) {}

  // Método del ciclo de vida que se ejecuta al inicializar el componente.
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.habitacion = this.habitaciones.find((h) => h.id === id);

    if (!this.habitacion) {
      console.error('Habitación no encontrada');
    }
  }
  // Método para reservar una habitación.
  reservarHabitacion() {
    if (this.habitacion && this.habitacion.disponibilidad > 0) {
      const user = this.authService.getCurrentUser(); // Obtén el usuario autenticado
      const reserva = {
        usuario_id: user?.id, // ID del usuario autenticado
        habitacion_id: this.habitacion.id,
      };
  
      // Envío de la reserva al servidor mediante una solicitud POST.
      this.http.post('http://localhost:3000/api/reservas', reserva).subscribe(
        (response: any) => {
          alert('Reserva realizada con éxito');
          this.habitacion.disponibilidad--; // Actualiza disponibilidad localmente
        },
        (error) => {
          alert(`Error al realizar la reserva: ${error.error.message || 'Error desconocido'}`);
          console.error('Detalle del error:', error);
        }
      );
    } else {
      alert('No hay disponibilidad para reservar esta habitación');
    }
  }
  
// Método para volver al catálogo de habitaciones.
  volverAlCatalogo() {
    this.router.navigate(['/catalogo']);
  }
}