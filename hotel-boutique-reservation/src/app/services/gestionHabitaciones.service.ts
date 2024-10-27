import { Injectable } from '@angular/core';
import { Habitacion } from '../models/habitacion';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GestionHabitacionesService {
  actualizarHabitacion(resultado: any) {
    throw new Error('Method not implemented.');
  }
  private readonly STORAGE_KEY = 'habitaciones';
  private habitaciones: Habitacion[] = [];

  constructor() {
    this.habitaciones = this.cargarHabitaciones();
  }

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
            disponible: true,
            imagen:
              'https://static.abc.es/Media/201504/27/hotel12--644x362.jpg',
          },
          {
            id: 2,
            nombre: 'Habitación Estándar',
            descripcion: 'Habitación cómoda y económica',
            precio: 100,
            disponible: true,
            imagen:
              'https://www.sillasmesas.es/blog/wp-content/uploads/2020/02/Decoracion-de-habitaciones-en-hoteles.jpg',
          },
          {
            id: 3,
            nombre: 'Habitación Grande',
            descripcion: 'Habitación Muy Grande',
            precio: 150,
            disponible: true,
            imagen:
              'https://hips.hearstapps.com/hmg-prod/images/habitacion-hotel-revolve2-1546271048.jpeg?resize=640:*',
          },
        ];
  }

  private guardarHabitaciones(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.habitaciones));
  }

  getHabitaciones(): Observable<Habitacion[]> {
    return of(this.habitaciones);
  }

  eliminarHabitacion(id: number): void {
    this.habitaciones = this.habitaciones.filter((h) => h.id !== id);
    this.guardarHabitaciones(); // Guarda el estado actualizado en localStorage
  }

  guardarHabitacion(habitacion: Habitacion): void {
    habitacion.id =
      this.habitaciones.length > 0
        ? Math.max(...this.habitaciones.map((h) => h.id)) + 1
        : 1;

    // Agregar la nueva habitación al arreglo local
    this.habitaciones.push({ ...habitacion });

    // Guardar los cambios en localStorage
    this.guardarHabitaciones();
  }
}
