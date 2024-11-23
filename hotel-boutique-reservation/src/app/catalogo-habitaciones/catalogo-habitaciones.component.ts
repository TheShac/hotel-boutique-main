import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalogo-habitaciones',  // Selector del componente para el catálogo de habitaciones
  templateUrl: './catalogo-habitaciones.component.html',  // Ruta al archivo de plantilla HTML del componente
  styleUrls: ['./catalogo-habitaciones.component.css']   // Ruta a la hoja de estilos CSS del componente
})

export class CatalogoHabitacionesComponent {
  
  // Definición de propiedades para la lista de habitaciones y el desplazamiento del carrusel
  habitaciones: {
    id: number;
    nombre: string;
    precio: number;
    disponibilidad: number;
    imagenUrl: string;
  }[];

  desplazamiento: number = 0;  // Control del desplazamiento en el carrusel de habitaciones
  anchoTarjeta: number = 320;  // Ancho de cada tarjeta de habitación en píxeles
  indexActual: number = 0;     // Índice de la tarjeta actualmente visible en el carrusel

  constructor(private router: Router) {
    // Inicializa el arreglo de habitaciones con datos de ejemplo
    this.habitaciones = [
      {
        id: 1,
        nombre: 'Habitación Estandar',
        precio: 89990,
        disponibilidad: 5,
        imagenUrl: 'https://www.ahstatic.com/photos/b5w1_rodbcovz_00_p_1024x768.jpg'
      },
      {
        id: 2,
        nombre: 'Habitación Twin',
        precio: 119990,
        disponibilidad: 5,
        imagenUrl: 'https://www.ahstatic.com/photos/b5w1_rod3cov_00_p_1024x768.jpg'
      },
      {
        id: 3,
        nombre: 'Habitación Superior',
        precio: 159990,
        disponibilidad: 5,
        imagenUrl: 'https://www.ahstatic.com/photos/b5w1_rodbbofz_00_p_1024x768.jpg'
      },
      {
        id: 4,
        nombre: 'Habitación Ejecutiva',
        precio: 129990,
        disponibilidad: 5,
        imagenUrl: 'https://www.ahstatic.com/photos/b5w1_rodbaofz_00_p_1024x768.jpg'
      },
      {
        id: 5,
        nombre: 'Habitación Familiar',
        precio: 129990,
        disponibilidad: 10,
        imagenUrl: 'https://www.ahstatic.com/photos/b5w1_rodbaofz_00_p_1024x768.jpg'
      },
      {
        id: 6,
        nombre: 'Habitación Suite Deluxe',
        precio: 189990,
        disponibilidad: 3,
        imagenUrl: 'https://www.ahstatic.com/photos/b5w1_rodbaofz_00_p_1024x768.jpg'
      },
      {
        id: 7,
        nombre: 'Habitación Junior Suite',
        precio: 179990,
        disponibilidad: 4,
        imagenUrl: 'https://www.ahstatic.com/photos/b5w1_rodbaofz_00_p_1024x768.jpg'
      },
      {
        id: 8,
        nombre: 'Habitación Premium',
        precio: 199990,
        disponibilidad: 2,
        imagenUrl: 'https://www.ahstatic.com/photos/b5w1_rodbaofz_00_p_1024x768.jpg'
      },
      {
        id: 9,
        nombre: 'Habitación Doble Confort',
        precio: 159990,
        disponibilidad: 3,
        imagenUrl: 'https://www.ahstatic.com/photos/b5w1_rodbaofz_00_p_1024x768.jpg'
      },
      {
        id: 10,
        nombre: 'Habitación Individual Económica',
        precio: 69990,
        disponibilidad: 8,
        imagenUrl: 'https://www.ahstatic.com/photos/b5w1_rodbaofz_00_p_1024x768.jpg'
      }
    ];
  }

  /**
   * Método para agregar una habitación al carrito.
   * Disminuye la disponibilidad de la habitación seleccionada si está disponible.
   * @param habitacion Objeto de habitación que se va a añadir al carrito
   */
  agregarAlCarrito(habitacion: any) {
    if (habitacion.disponibilidad > 0) {
      console.log(`Habitación ${habitacion.nombre} añadida al carrito.`);
      habitacion.disponibilidad--; 
    } else {
      console.log(`Habitación ${habitacion.nombre} no está disponible.`);
    }
  }

  /**
   * Método para redirigir a la página de detalles de una habitación específica.
   * @param id Identificador de la habitación a la que se desea navegar
   */
  irADetalle(id: number) {
    this.router.navigate(['/habitacion', id]);
  }
}
