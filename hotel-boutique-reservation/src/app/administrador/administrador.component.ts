import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GestionHabitacionesService } from '../services/gestionHabitaciones.service';
import { Habitacion } from '../models/habitacion';
import { MatDialog } from '@angular/material/dialog';
import { EditarHabitacionComponent } from '../editar-habitacion/editar-habitacion.component';
import Swal from 'sweetalert2';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom,
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-in', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class AdministradorComponent implements OnInit {
  mostrarDiv = true;

  formatear() {
    localStorage.clear(); // Limpiar el almacenamiento local
    window.location.reload(); // Recargar la página
  }

  // Propiedades de la habitación declaradas individualmente
  nombre: string = '';
  descripcion: string = '';
  precio: number = 0;
  disponible: number = 5; // Valor inicial de disponibilidad
  imagen: string = '';

  habitaciones: any[] = []; // Arreglo para almacenar las habitaciones cargadas desde el backend

  constructor(
    private gestionHabitacionesService: GestionHabitacionesService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.cargarHabitaciones(); // Cargar las habitaciones al iniciar el componente
  }

  cargarHabitaciones(): void {
    this.gestionHabitacionesService.getHabitaciones().subscribe((data) => {
      this.habitaciones = data; // Asigna las habitaciones obtenidas al arreglo
    });
  }

  guardarHabitacion() {
    // Validación de campos
    if (!this.nombre || this.precio <= 0 || !this.descripcion) {
      Swal.fire({
        title: 'Campos incompletos',
        text: 'Por favor completa todos los campos antes de guardar.',
        icon: 'warning',
        confirmButtonText: 'Entendido',
      });
    } 
    else if (!(this.verificarImagen(this.imagen))) {
      // Verificar que la imagen se haya cargado correctamente
      Swal.fire({
        title: 'Error al cargar la imagen',
        text: 'La imagen no se ha cargado correctamente. Por favor, intenta de nuevo.',
        icon: 'error',
        confirmButtonText: 'Entendido',
      });
    }
    else {
      // Creación de un objeto para enviar al servicio
      const nuevaHabitacion = {
        id: 0,
        nombre: this.nombre,
        descripcion: this.descripcion,
        precio: this.precio,
        disponible: this.disponible,
        imagen: this.imagen,
      };

      // Guardar la nueva habitación usando el servicio
      this.gestionHabitacionesService.guardarHabitacion(nuevaHabitacion).subscribe(
        (response) => {
          Swal.fire({
            title: 'Habitación guardada',
            text: 'La habitación se ha guardado correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar',
          });
          this.cargarHabitaciones(); // Actualizar la lista de habitaciones
          this.resetFormulario(); // Restablecer los valores del formulario
        }
      );
    }
  }

  eliminarHabitacion(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.gestionHabitacionesService.eliminarHabitacion(id).subscribe(() => {
          Swal.fire({
            title: 'Eliminado!',
            text: 'La habitación ha sido eliminada.',
            icon: 'success',
            confirmButtonText: 'Entendido',
          });
          this.cargarHabitaciones(); // Actualizar la lista de habitaciones después de eliminar
        });
      }
    });
  }

  resetFormulario(): void {
    // Restablecer cada propiedad a su valor inicial
    this.nombre = '';
    this.descripcion = '';
    this.precio = 0;
    this.disponible = 5; // Valor predeterminado de disponibilidad
    this.imagen = '';
  }

  verificarImagen(url: string) {
    return new Promise((resolve, reject) => {
      const img = new Image(); // Crear un nuevo objeto de imagen

      img.onload = () => resolve(true); // La imagen se cargó correctamente
      img.onerror = () => resolve(false); // Error al cargar la imagen

      img.src = url; // Establecer la URL de la imagen
    });
  }

  abrirDialogo(habitacion: Habitacion): void {
    
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
