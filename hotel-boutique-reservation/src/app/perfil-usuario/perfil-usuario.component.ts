import { Component, OnInit, ElementRef } from '@angular/core';
import { ReservaService } from '../services/reserva.service';
import { Habitacion } from '../models/habitacion';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {
 

  reservas: { habitacion: Habitacion, fecha: string }[] = [];
  historialReservas: { habitacion: Habitacion, fecha: string }[] = [];

  // Variables para almacenar los datos del usuario
  nombre: string | null = '';
  apellido: string | null = '';
  email: string | null = '';

  constructor(private reservaService: ReservaService, private authService: AuthService) {}
  
  ngOnInit(): void {

    // Obtener los datos del usuario al inicializar el componente
    const usuario = this.authService.getUsuario();
    this.nombre = usuario.nombre;
    this.apellido = usuario.apellido;
    this.email = usuario.email;
    
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
