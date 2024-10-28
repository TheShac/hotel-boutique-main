import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Habitacion } from '../models/habitacion';
import { GestionHabitacionesService } from '../services/gestionHabitaciones.service';
import { MatDialog } from '@angular/material/dialog'; // Importar MatDialog
import { EditarHabitacionComponent } from '../editar-habitacion/editar-habitacion.component'; // Importar el componente de edición
import Swal from 'sweetalert2';
import { trigger, state, style, transition, animate, } from '@angular/animations';

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
    localStorage.clear();
    window.location.reload();
  }
  habitacion: Habitacion = {
    id: 0,
    nombre: '',
    descripcion: '',
    precio: 0,
    disponible: true,
    imagen: '',
  };
  habitaciones: Habitacion[] = [];
  isLoaded = false; // Controla si el componente ha cargado

  constructor(
    private gestionHabitacionesService: GestionHabitacionesService,
    private dialog: MatDialog // Inyectar MatDialog
  ) {}

  ngOnInit(): void {
    this.cargarHabitaciones();
  }

  cargarHabitaciones(): void {
    this.gestionHabitacionesService.getHabitaciones().subscribe((data) => {
      this.habitaciones = data;
    });
  }

  async guardarHabitacion() {
    if (this.habitaciones.length < 20) {
      if (
        this.habitacion.nombre == '' ||
        this.habitacion.precio == 0 ||
        this.habitacion.descripcion == '' ||
        this.habitacion.imagen == ''
      ) {
        Swal.fire({
          title: 'Campos incompletos',
          text: 'Por favor completa todos los campos antes de guardar.',
          icon: 'warning',
          confirmButtonText: 'Entendido',
        });
      } else if (!(await this.verificarImagen(this.habitacion.imagen))) {
        Swal.fire({
          title: 'Error al cargar la imagen',
          text: 'La imagen no se ha cargado correctamente. Por favor, intenta de nuevo.',
          icon: 'error',
          confirmButtonText: 'Entendido',
        });
      } else if (this.habitacion.precio < 0) {
        Swal.fire({
          title: 'Precio negativo',
          text: 'El precio de la habitación no puede ser negativo.',
          icon: 'error',
          confirmButtonText: 'Entendido',
        });
      } else {
        console.log(this.habitacion);
        this.gestionHabitacionesService.guardarHabitacion(this.habitacion);
        Swal.fire({
          title: 'Habitación guardada',
          text: 'La habitación se ha guardado correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
      }
    } else {
      Swal.fire({
        title: 'Todas las habitaciones ocupadas',
        text: 'No puedes agregar más habitaciones.',
        icon: 'warning',
        confirmButtonText: 'Entendido',
      });
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
        console.log(id);
        this.gestionHabitacionesService.eliminarHabitacion(id);
        this.cargarHabitaciones();
        Swal.fire({
          title: 'Eliminado!',
          text: 'La habitación ha sido eliminada.',
          icon: 'success',
          confirmButtonText: 'Entendido',
          willClose: () => {
            window.location.reload();
          },
        });
      }
    });
    this.cargarHabitaciones();
  }

  verificarImagen(url: string) {
    return new Promise((resolve, reject) => {
      const img = new Image();

      img.onload = () => resolve(true); // La imagen se cargó correctamente
      img.onerror = () => resolve(false); // Error al cargar la imagen

      img.src = url;
    });
  }

  abrirDialogo(habitacion: Habitacion): void {
    this.mostrarDiv = false; 
    const dialogRef = this.dialog.open(EditarHabitacionComponent, {
      data: habitacion,
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      // Verifica si el diálogo retorna un resultado válido
      if (!result) {
        return; // No hace nada si no hay resultado
      }

      if (
        result.nombre == '' ||
        result.precio == 0 ||
        result.descripcion == '' ||
        result.imagen == ''
      ) {
        Swal.fire({
          title: 'Campos incompletos',
          text: 'Por favor completa todos los campos antes de guardar.',
          icon: 'warning',
          confirmButtonText: 'Entendido',
          willClose: () => {
            window.location.reload();
          },
        });
      } else if (!(await this.verificarImagen(result.imagen))) {
        Swal.fire({
          title: 'Error al cargar la imagen',
          text: 'La imagen no se ha cargado correctamente. Por favor, intenta de nuevo.',
          icon: 'error',
          confirmButtonText: 'Entendido',
          willClose: () => {
            window.location.reload();
          },
        });
      } else if (result.precio < 0) {
        Swal.fire({
          title: 'Precio negativo',
          text: 'El precio de la habitación no puede ser negativo.',
          icon: 'error',
          confirmButtonText: 'Entendido',
          willClose: () => {
            window.location.reload();
          },
        });
      } else {
        console.log(result);
        this.gestionHabitacionesService.eliminarHabitacion(result.id);
        this.gestionHabitacionesService.guardarHabitacion(result);

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
