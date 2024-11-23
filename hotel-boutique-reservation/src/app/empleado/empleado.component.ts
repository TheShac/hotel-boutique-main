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
  total: number;
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
      total: 300
    },
    {
      habitacion: { nombre: 'Habitación Doble' },
      cliente: { nombre: 'Ana', apellido: 'González' },
      fecha: '2024-11-24',
      servicios: [
        { nombre: 'Piscina', precio: 15 },
        { nombre: 'Tour guiado', precio: 30 },
      ],
      total: 200
    }
  ];

  eliminarReserva(reserva: Reserva) {
    console.log('Eliminar reserva:', reserva);
    // Aquí se implementará la lógica de eliminar la reserva
  }

  editarReserva(reserva: Reserva) {
    console.log('Editar reserva:', reserva);
    // Aquí se implementará la lógica para editar la reserva (quitar servicios)
  }

  eliminarServicio(reserva: Reserva, servicio: Servicio) {
    console.log('Eliminar servicio:', servicio, 'de la reserva:', reserva);
    // Aquí se implementará la lógica para eliminar el servicio de la reserva
  }
}
