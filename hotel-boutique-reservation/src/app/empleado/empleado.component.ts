import { Component } from '@angular/core';

interface Servicio {
  nombre: string;
  precio: number;
}

interface Reserva {
  habitacion: { nombre: string };
  cliente: { nombre: string; apellido: string };
  fecha: string;
  servicios: Servicio[];
  total: number; // Costo de la reserva base
  estado: 'pendiente' | 'confirmada' | 'cancelada';
}

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent {
  reservas: Reserva[] = [
    {
      habitacion: { nombre: 'Suite Ejecutiva' },
      cliente: { nombre: 'Carlos', apellido: 'Pérez' },
      fecha: '2024-11-23',
      servicios: [
        { nombre: 'Desayuno', precio: 20 },
        { nombre: 'Spa', precio: 50 },
      ],
      total: 300,
      estado: 'pendiente'
    },
    {
      habitacion: { nombre: 'Habitación Doble' },
      cliente: { nombre: 'Ana', apellido: 'González' },
      fecha: '2024-11-24',
      servicios: [
        { nombre: 'Piscina', precio: 15 },
        { nombre: 'Tour guiado', precio: 30 },
      ],
      total: 200,
      estado: 'confirmada'
    }
  ];

  filtroEstado: string = '';

  get reservasFiltradas(): Reserva[] {
    if (!this.filtroEstado) {
      return this.reservas;
    }
    return this.reservas.filter(reserva => reserva.estado === this.filtroEstado);
  }

  eliminarReserva(reserva: Reserva) {
    if (confirm(`¿Estás seguro de eliminar la reserva de ${reserva.cliente.nombre}?`)) {
      this.reservas = this.reservas.filter(r => r !== reserva);
    }
  }

  editarReserva(reserva: Reserva) {
    console.log('Editar reserva:', reserva);
    // Lógica para editar la reserva
  }

  eliminarServicio(reserva: Reserva, servicio: Servicio) {
    if (confirm(`¿Estás seguro de eliminar el servicio ${servicio.nombre}?`)) {
      reserva.servicios = reserva.servicios.filter(s => s !== servicio);
    }
  }

  calcularCostoServicios(reserva: Reserva): number {
    return reserva.servicios.reduce((total, servicio) => total + servicio.precio, 0);
  }

  calcularTotal(reserva: Reserva): number {
    return reserva.total + this.calcularCostoServicios(reserva);
  }
}
