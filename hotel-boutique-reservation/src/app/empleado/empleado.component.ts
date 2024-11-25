import { Component } from '@angular/core'; // Importación del decorador `Component` para definir un componente de Angular.

interface Servicio {
  nombre: string; // Nombre del servicio.
  precio: number; // Precio del servicio.
}

interface Reserva {
  habitacion: { nombre: string }; // Información de la habitación reservada.
  cliente: { nombre: string; apellido: string }; // Datos del cliente.
  fecha: string; // Fecha de la reserva.
  servicios: Servicio[]; // Lista de servicios adicionales.
  total: number; // Costo base de la reserva.
  estado: 'pendiente' | 'confirmada' | 'cancelada'; // Estado actual de la reserva.
}

@Component({
  selector: 'app-empleado', // Selector del componente.
  templateUrl: './empleado.component.html', // Archivo de plantilla asociado.
  styleUrls: ['./empleado.component.css'] // Archivo de estilos asociado.
})
export class EmpleadoComponent {
  // Lista inicial de reservas.
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

  // Filtro para buscar reservas por estado.
  filtroEstado: string = '';

  // Método calculado que devuelve las reservas filtradas según el estado.
  get reservasFiltradas(): Reserva[] {
    if (!this.filtroEstado) {
      return this.reservas;
    }
    return this.reservas.filter(reserva => reserva.estado === this.filtroEstado);
  }

  // Método para eliminar una reserva.
  eliminarReserva(reserva: Reserva) {
    if (confirm(`¿Estás seguro de eliminar la reserva de ${reserva.cliente.nombre}?`)) {
      this.reservas = this.reservas.filter(r => r !== reserva);
    }
  }

  // Método para editar una reserva.
  editarReserva(reserva: Reserva) {
    console.log('Editar reserva:', reserva);
    // Lógica para editar la reserva (a implementar).
  }

  // Método para eliminar un servicio de una reserva.
  eliminarServicio(reserva: Reserva, servicio: Servicio) {
    if (confirm(`¿Estás seguro de eliminar el servicio ${servicio.nombre}?`)) {
      reserva.servicios = reserva.servicios.filter(s => s !== servicio);
    }
  }

  // Método para calcular el costo total de los servicios adicionales.
  calcularCostoServicios(reserva: Reserva): number {
    return reserva.servicios.reduce((total, servicio) => total + servicio.precio, 0);
  }

  // Método para calcular el costo total de la reserva (base + servicios).
  calcularTotal(reserva: Reserva): number {
    return reserva.total + this.calcularCostoServicios(reserva);
  }
}
