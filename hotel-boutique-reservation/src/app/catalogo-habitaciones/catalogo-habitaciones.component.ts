import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../services/reserva.service';
import { Habitacion } from '../models/habitacion';

@Component({
  selector: 'app-catalogo-habitaciones',
  templateUrl: './catalogo-habitaciones.component.html',
})
export class CatalogoHabitacionesComponent implements OnInit {
  habitaciones: Habitacion[] = [];

  constructor(private reservaService: ReservaService) {}

  // Cargar las habitaciones cuando el componente se inicializa
  ngOnInit(): void {
    this.reservaService.getHabitaciones().subscribe(data => {
      this.habitaciones = data;
    });
  }

  // Método para agregar una habitación al carrito de compras o hacer una reserva
  agregarAlCarrito(habitacion: Habitacion) {
    this.reservaService.realizarReserva(habitacion.id).subscribe(success => {
      if (success) {
        alert(`Has reservado la habitación: ${habitacion.nombre}`);
      } else {
        alert('Esta habitación ya está reservada.');
      }
    });
  }
}
