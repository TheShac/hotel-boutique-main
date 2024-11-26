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
        disponibilidad: 5,
        imagenUrl: 'https://www.infobae.com/resizer/v2/https%3A%2F%2Fs3.amazonaws.com%2Farc-wordpress-client-uploads%2Finfobae-wp%2Fwp-content%2Fuploads%2F2019%2F05%2F20152026%2FThe-Peninsula-Manila-2.jpg?auth=f18ebb60058febe2d014b56cb686677d32950f83e85d5585707982478fc3a5d4&smart=true&width=577&height=325&quality=85'
      },
      {
        id: 6,
        nombre: 'Habitación Suite Deluxe',
        precio: 189990,
        disponibilidad: 5,
        imagenUrl: 'https://www.infobae.com/resizer/v2/https%3A%2F%2Fs3.amazonaws.com%2Farc-wordpress-client-uploads%2Finfobae-wp%2Fwp-content%2Fuploads%2F2019%2F05%2F20152130%2FBulgari-Resort-Bali-2.jpg?auth=22c9da425bfca090b5cc6d767655bdd430edb5513f1fcf7a8592acfe9ef6efbb&smart=true&width=577&height=325&quality=85'
      },
      {
        id: 7,
        nombre: 'Habitación Junior Suite',
        precio: 179990,
        disponibilidad: 5,
        imagenUrl: 'https://www.infobae.com/resizer/v2/https%3A%2F%2Fs3.amazonaws.com%2Farc-wordpress-client-uploads%2Finfobae-wp%2Fwp-content%2Fuploads%2F2019%2F05%2F20152242%2FDorado-Beach-a-Ritz-Carlton-Reserve-2.jpg?auth=23efc3848bca987840871ee5645f3dc931854a77d1d78efb16ef446a351d7e7e&smart=true&width=577&height=385&quality=85'
      },
      {
        id: 8,
        nombre: 'Habitación Premium',
        precio: 199990,
        disponibilidad: 5,
        imagenUrl: 'https://www.infobae.com/resizer/v2/https%3A%2F%2Fs3.amazonaws.com%2Farc-wordpress-client-uploads%2Finfobae-wp%2Fwp-content%2Fuploads%2F2019%2F05%2F20152346%2FHotel-de-Crillon-A-Rosewood-Hotel-3.jpg?auth=f1667064fdefa680728ce7a3e71fcf52e0b1ff57f4dee02ef97e651fd6eb06b1&smart=true&width=577&height=325&quality=85'
      },
      {
        id: 9,
        nombre: 'Habitación Doble Confort',
        precio: 159990,
        disponibilidad: 5,
        imagenUrl: 'https://www.infobae.com/resizer/v2/https%3A%2F%2Fs3.amazonaws.com%2Farc-wordpress-client-uploads%2Finfobae-wp%2Fwp-content%2Fuploads%2F2019%2F05%2F20152451%2FMandarin-Oriental-Hong-Kong-3.jpg?auth=274d31ca583860b8206988f2e876e065cbee28053058ea874c029fa67ca97c1a&smart=true&width=577&height=325&quality=85'
      },
      {
        id: 10,
        nombre: 'Habitación Individual Económica',
        precio: 69990,
        disponibilidad: 5,
        imagenUrl: 'https://www.hotelportuense.com/wp-content/uploads/sites/41/2019/05/gallery_Single-room10.jpg'
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
