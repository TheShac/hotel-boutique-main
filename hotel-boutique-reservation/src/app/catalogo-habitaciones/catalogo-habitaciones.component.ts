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
        imagenUrl: 'https://www.mator.es/wp-content/webpc-passthru.php?src=https://www.mator.es/wp-content/uploads/2020/09/limpiezahabitaciondehotel.jpg&nocache=1'
      },
      {
        id: 6,
        nombre: 'Habitación Suite Deluxe',
        precio: 189990,
        disponibilidad: 3,
        imagenUrl: 'https://itexa.es/blog/wp-content/uploads/2024/06/tipos-habitaciones-hotel-portada.jpg'
      },
      {
        id: 7,
        nombre: 'Habitación Junior Suite',
        precio: 179990,
        disponibilidad: 4,
        imagenUrl: 'https://plus.unsplash.com/premium_photo-1661964402307-02267d1423f5?q=80&w=1073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
      {
        id: 8,
        nombre: 'Habitación Premium',
        precio: 199990,
        disponibilidad: 2,
        imagenUrl: 'https://plus.unsplash.com/premium_photo-1675616563084-63d1f129623d?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
      {
        id: 9,
        nombre: 'Habitación Doble Confort',
        precio: 159990,
        disponibilidad: 3,
        imagenUrl: 'https://emprendedores.es/wp-content/uploads//iStock-907621754-e1639556826504-1024x576.jpg'
      },
      {
        id: 10,
        nombre: 'Habitación Individual Económica',
        precio: 69990,
        disponibilidad: 8,
        imagenUrl: 'https://q-xx.bstatic.com/xdata/images/hotel/max500/579253081.jpg?k=57c8b5a5cbd6bbe09e73dcf2cdc821ad940d379df6be897aa484fb41334c60ec&o='
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
