import { Injectable } from '@angular/core';
import { Servicio } from '../models/servicio';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiciosService {
  private readonly SERVICIOS_STORAGE_KEY = 'servicios';
  private servicios: Servicio[] = [];

  constructor() {
    this.servicios = this.cargarServicios();
  }

  private cargarServicios(): Servicio[] {
    const ServiciosGuardados = localStorage.getItem(this.SERVICIOS_STORAGE_KEY);
    return ServiciosGuardados
      ? JSON.parse(ServiciosGuardados)
      : [
          { id: 1, nombre: 'Servicio 1', descripcion: 'ipsum', precio: 14 },
          {
            id: 2,
            nombre: 'Servicio 2',
            descripcion: 'ipsum sdad dsd a',
            precio: 17,
          },
        ];
  }

  private guardarServicios(): void {
    localStorage.setItem(
      this.SERVICIOS_STORAGE_KEY,
      JSON.stringify(this.servicios)
    );
  }

  getServicios(): Observable<Servicio[]> {
    return of(this.servicios);
  }

  eliminarServicio(id: number): void {
    this.servicios = this.servicios.filter((h) => h.id !== id);
    this.guardarServicios(); // Guarda el estado actualizado en localStorage
  }

  guardarServicio(servicio: Servicio): void {
    console.log(servicio);
    servicio.id =
      this.servicios.length > 0
        ? Math.max(...this.servicios.map((h) => h.id)) + 1
        : 1;

    this.servicios.push({ ...servicio });

    // Guardar los cambios en localStorage
    this.guardarServicios();
  }
}
