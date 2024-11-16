import { Component, OnInit, ElementRef } from '@angular/core';
import { ReservaService } from '../services/reserva.service';
import { Habitacion } from '../models/habitacion';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
})
export class PerfilUsuarioComponent implements OnInit {
 

  reservas: { habitacion: Habitacion, fecha: string }[] = [];
  historialReservas: { habitacion: Habitacion, fecha: string }[] = [];

  constructor(private reservaService: ReservaService, private authService: AuthService) {}
  const usuario ;
  ngOnInit(): void {

    
    // Simulación de reservas activas y pasadas
    this.reservaService.getHabitaciones().subscribe(data => {
      const habitacionesReservadas = data.filter(habitacion => !habitacion.disponible);
      
      this.reservas = habitacionesReservadas.slice(0, 1).map(habitacion => ({
        habitacion,
        fecha: '12/10/2024'
      }));

      this.historialReservas = habitacionesReservadas.slice(1).map(habitacion => ({
        habitacion,
        fecha: '10/10/2023'
      }));
    });
  }

  // Método para enfocar el campo de email
  enfocarEmail(emailInput: HTMLInputElement) {
    emailInput.focus();
  }
}
