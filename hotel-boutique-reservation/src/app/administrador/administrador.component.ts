import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Habitacion } from '../models/habitacion';
import { GestionHabitacionesService } from '../services/gestionHabitaciones.service';
import { MatDialog } from '@angular/material/dialog'; // Importar MatDialog para manejar diálogos
import { EditarHabitacionComponent } from '../editar-habitacion/editar-habitacion.component'; // Importar el componente para editar habitaciones
import Swal from 'sweetalert2'; // Importar SweetAlert2 para mostrar alertas
import { trigger, state, style, transition, animate } from '@angular/animations'; // Importar animaciones de Angular

@Component({
  selector: 'app-administrador', // Selector para el componente
  templateUrl: './administrador.component.html', // URL de la plantilla HTML
  styleUrls: ['./administrador.component.css'], // URL de los estilos CSS
  encapsulation: ViewEncapsulation.ShadowDom, // Usar encapsulación Shadow DOM para estilos
  animations: [
    // Definición de animaciones para el componente
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }), // Estilo inicial con opacidad 0
        animate('500ms ease-in', style({ opacity: 1 })), // Animación de entrada
      ]),
    ]),
  ],
})
export class AdministradorComponent implements OnInit {
  mostrarDiv = true; // Controla la visibilidad de la sección de gestión de habitaciones

  // Método para formatear el cache y recargar la página
  formatear() {
    localStorage.clear(); // Limpiar el almacenamiento local
    window.location.reload(); // Recargar la página
  }

  // Objeto para almacenar los datos de la habitación
  habitacion: Habitacion = {
    id: 0,
    nombre: '',
    descripcion: '',
    precio: 0,
    disponible: true,
    imagen: '',
  };

  habitaciones: Habitacion[] = []; // Array para almacenar la lista de habitaciones
  isLoaded = false; // Bandera para verificar si los datos han sido cargados

  constructor(
    private gestionHabitacionesService: GestionHabitacionesService, // Servicio para gestionar habitaciones
    private dialog: MatDialog // Servicio para manejar diálogos
  ) {}

  ngOnInit(): void {
    // Método de ciclo de vida que se llama al inicializar el componente
    this.cargarHabitaciones(); // Cargar las habitaciones al inicializar
  }

  // Método para cargar las habitaciones desde el servicio
  cargarHabitaciones(): void {
    this.gestionHabitacionesService.getHabitaciones().subscribe((data) => {
      this.habitaciones = data; // Asignar los datos recibidos al array de habitaciones
    });
  }

  // Método para guardar una nueva habitación
  async guardarHabitacion() {
    // Verificar si hay espacio para más habitaciones
    if (this.habitaciones.length < 20) {
      // Validar que todos los campos estén completos
      if (
        this.habitacion.nombre == '' ||
        this.habitacion.precio == 0 ||
        this.habitacion.descripcion == '' ||
        this.habitacion.imagen == ''
      ) {
        // Mostrar alerta si hay campos incompletos
        Swal.fire({
          title: 'Campos incompletos',
          text: 'Por favor completa todos los campos antes de guardar.',
          icon: 'warning',
          confirmButtonText: 'Entendido',
        });
      } else if (!(await this.verificarImagen(this.habitacion.imagen))) {
        // Verificar que la imagen se haya cargado correctamente
        Swal.fire({
          title: 'Error al cargar la imagen',
          text: 'La imagen no se ha cargado correctamente. Por favor, intenta de nuevo.',
          icon: 'error',
          confirmButtonText: 'Entendido',
        });
      } else if (this.habitacion.precio < 0) {
        // Verificar que el precio no sea negativo
        Swal.fire({
          title: 'Precio negativo',
          text: 'El precio de la habitación no puede ser negativo.',
          icon: 'error',
          confirmButtonText: 'Entendido',
        });
      } else {
        console.log(this.habitacion); // Imprimir los datos de la habitación en consola
        this.gestionHabitacionesService.guardarHabitacion(this.habitacion); // Guardar la habitación utilizando el servicio
        // Mostrar alerta de éxito
        Swal.fire({
          title: 'Habitación guardada',
          text: 'La habitación se ha guardado correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
      }
    } else {
      // Mostrar alerta si se han alcanzado el máximo de habitaciones
      Swal.fire({
        title: 'Todas las habitaciones ocupadas',
        text: 'No puedes agregar más habitaciones.',
        icon: 'warning',
        confirmButtonText: 'Entendido',
      });
    }
  }

  // Método para eliminar una habitación
  eliminarHabitacion(id: number): void {
    // Mostrar alerta de confirmación
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true, // Mostrar botón de cancelar
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(id); // Imprimir el ID de la habitación a eliminar
        this.gestionHabitacionesService.eliminarHabitacion(id); // Llamar al servicio para eliminar la habitación
        this.cargarHabitaciones(); // Recargar la lista de habitaciones
        // Mostrar alerta de éxito
        Swal.fire({
          title: 'Eliminado!',
          text: 'La habitación ha sido eliminada.',
          icon: 'success',
          confirmButtonText: 'Entendido',
          willClose: () => {
            window.location.reload(); // Recargar la página después de cerrar la alerta
          },
        });
      }
    });
    this.cargarHabitaciones(); // Recargar la lista de habitaciones después de la acción
  }

  // Método para verificar si una imagen se carga correctamente
  verificarImagen(url: string) {
    return new Promise((resolve, reject) => {
      const img = new Image(); // Crear un nuevo objeto de imagen

      img.onload = () => resolve(true); // La imagen se cargó correctamente
      img.onerror = () => resolve(false); // Error al cargar la imagen

      img.src = url; // Establecer la URL de la imagen
    });
  }

  // Método para abrir el diálogo de edición de habitación
  abrirDialogo(habitacion: Habitacion): void {
    //this.mostrarDiv = false; 
    const dialogRef = this.dialog.open(EditarHabitacionComponent, {
      data: habitacion, // Pasar la habitación a editar al diálogo
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      // Verifica si el diálogo retorna un resultado válido
      if (!result) {
        return; // No hace nada si no hay resultado
      }

      // Validar que todos los campos estén completos
      if (
        result.nombre == '' ||
        result.precio == 0 ||
        result.descripcion == '' ||
        result.imagen == ''
      ) {
        // Mostrar alerta si hay campos incompletos
        Swal.fire({
          title: 'Campos incompletos',
          text: 'Por favor completa todos los campos antes de guardar.',
          icon: 'warning',
          confirmButtonText: 'Entendido',
          willClose: () => {
            window.location.reload(); // Recargar la página al cerrar la alerta
          },
        });
      } else if (!(await this.verificarImagen(result.imagen))) {
        // Verificar que la imagen se haya cargado correctamente
        Swal.fire({
          title: 'Error al cargar la imagen',
          text: 'La imagen no se ha cargado correctamente. Por favor, intenta de nuevo.',
          icon: 'error',
          confirmButtonText: 'Entendido',
          willClose: () => {
            window.location.reload(); // Recargar la página al cerrar la alerta
          },
        });
      } else if (result.precio < 0) {
        // Verificar que el precio no sea negativo
        Swal.fire({
          title: 'Precio negativo',
          text: 'El precio de la habitación no puede ser negativo.',
          icon: 'error',
          confirmButtonText: 'Entendido',
          willClose: () => {
            window.location.reload(); // Recargar la página al cerrar la alerta
          },
        });
      } else {
        console.log(result); // Imprimir los datos de la habitación editada en consola
        this.gestionHabitacionesService.eliminarHabitacion(result.id); // Eliminar la habitación anterior
        this.gestionHabitacionesService.guardarHabitacion(result); // Guardar los nuevos datos de la habitación

        // Mostrar alerta de éxito
        Swal.fire({
          title: 'Habitación guardada',
          text: 'La habitación se ha guardado correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
      }
    });
  }
}
