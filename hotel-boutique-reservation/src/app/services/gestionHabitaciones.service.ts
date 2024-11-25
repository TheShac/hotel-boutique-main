import { Injectable } from '@angular/core'; // Decorador para definir un servicio.
import { Habitacion } from '../models/habitacion'; // Modelo de datos para habitaciones.
import { Observable, of } from 'rxjs'; // Herramientas para manejar observables.
import { HttpClient } from '@angular/common/http'; // Servicio HTTP para realizar peticiones.

@Injectable({
  providedIn: 'root', // Proporciona el servicio en el nivel raíz de la aplicación.
})
export class GestionHabitacionesService {
  private apiUrl = 'http://localhost:3000'; // URL base de la API.
  private readonly STORAGE_KEY = 'habitaciones'; // Clave para almacenar las habitaciones en `localStorage`.
  private habitaciones: Habitacion[] = []; // Arreglo local para gestionar las habitaciones.

  private habitacion = {
    nombre: '',
    descripcion: '',
    precio: 0,
    disponible: 0,
    imagen: '',
  };

  constructor(private http: HttpClient) {
    // Carga las habitaciones desde el almacenamiento local al inicializar el servicio.
    this.habitaciones = this.cargarHabitaciones();
  }

  /**
   * Carga las habitaciones desde `localStorage`.
   * Si no hay datos, devuelve un conjunto de habitaciones predeterminadas.
   */
  private cargarHabitaciones(): Habitacion[] {
    const habitacionesGuardadas = localStorage.getItem(this.STORAGE_KEY);
    return habitacionesGuardadas
      ? JSON.parse(habitacionesGuardadas)
      : [
          {
            id: 1,
            nombre: 'Suite Deluxe',
            descripcion: 'Habitación de lujo con vista al mar',
            precio: 200,
            disponible: 5,
            imagen:
              'https://static.abc.es/Media/201504/27/hotel12--644x362.jpg',
          },
          {
            id: 2,
            nombre: 'Habitación Estándar',
            descripcion: 'Habitación cómoda y económica',
            precio: 100,
            disponible: 5,
            imagen:
              'https://www.sillasmesas.es/blog/wp-content/uploads/2020/02/Decoracion-de-habitaciones-en-hoteles.jpg',
          },
          {
            id: 3,
            nombre: 'Habitación Grande',
            descripcion: 'Habitación Muy Grande',
            precio: 150,
            disponible: 5,
            imagen:
              'https://hips.hearstapps.com/hmg-prod/images/habitacion-hotel-revolve2-1546271048.jpeg?resize=640:*',
          },
        ];
  }

  /**
   * Guarda las habitaciones actuales en `localStorage`.
   */
  private guardarHabitaciones(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.habitaciones));
  }

  /**
   * Obtiene todas las habitaciones como un observable.
   * @returns Observable con el arreglo de habitaciones.
   */
  getHabitaciones(): Observable<Habitacion[]> {
    return of(this.habitaciones);
  }

  /**
   * Elimina una habitación por su ID.
   * @param id - ID de la habitación a eliminar.
   * @returns Observable vacío al completar la operación.
   */
  eliminarHabitacion(id: number): Observable<void> {
    this.habitaciones = this.habitaciones.filter((h) => h.id !== id);
    this.guardarHabitaciones(); // Guarda el estado actualizado en localStorage
    return of(void 0);
  }

  /**
   * Agrega una nueva habitación al sistema.
   * @param habitacion - Objeto con los datos de la nueva habitación.
   * @returns Observable con la habitación creada.
   */
  guardarHabitacion(habitacion: Habitacion): Observable<Habitacion> {
    habitacion.id =
      this.habitaciones.length > 0
        ? Math.max(...this.habitaciones.map((h) => h.id)) + 1
        : 1;

    // Agregar la nueva habitación al arreglo local.
    this.habitaciones.push({ ...habitacion });

    // Guardar los cambios en localStorage.
    this.guardarHabitaciones();
    return of(habitacion);
  }

  /**
   * Método de ejemplo para actualizar una habitación (no implementado).
   */
  actualizarHabitacion(resultado: any) {
    throw new Error('Method not implemented.');
  }
}
