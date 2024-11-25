import { Component, OnInit, ViewEncapsulation } from '@angular/core'; // Importaciones esenciales de Angular.
import { Servicio } from '../models/servicio'; // Modelo de datos para servicios.
import { ServiciosService } from '../services/servicios.service'; // Servicio para gestionar los servicios.
import { MatDialog } from '@angular/material/dialog'; // Herramienta para manejar diálogos modales.
import { AgregarServicioDialogComponent } from '../agregar-servicio-dialog/agregar-servicio-dialog.component'; // Componente para agregar servicios.
import Swal from 'sweetalert2'; // Biblioteca para mostrar alertas personalizadas.
import { EditarServicioDialogComponent } from '../editar-servicio-dialog/editar-servicio-dialog.component'; // Componente para editar servicios.

@Component({
  selector: 'app-gestionar-servicios', // Selector del componente.
  templateUrl: './gestionar-servicios.component.html', // Archivo de plantilla asociado.
  styleUrls: ['./gestionar-servicios.component.css'], // Archivo de estilos asociado.
  encapsulation: ViewEncapsulation.ShadowDom, // Encapsulación para proteger los estilos del componente.
})
export class GestionarServiciosComponent implements OnInit {
  servicios: Servicio[] = []; // Lista de servicios cargados desde el backend.

  // Servicio actual (estructura predeterminada).
  servicio: Servicio = {
    id: 0,
    nombre: '',
    descripcion: '',
    precio: 0,
  };

  // Inyección de dependencias.
  constructor(
    private serviciosService: ServiciosService, // Servicio para interactuar con el backend.
    private dialog: MatDialog // Servicio para manejar diálogos modales.
  ) {}

  // Método que se ejecuta al inicializar el componente.
  ngOnInit(): void {
    this.cargarServicios(); // Carga los servicios desde el backend.
  }

  // Método para cargar la lista de servicios desde el backend.
  cargarServicios(): void {
    this.serviciosService.getServicios().subscribe((data) => {
      this.servicios = data; // Asigna los servicios obtenidos a la propiedad `servicios`.
    });
  }

  // Método para eliminar un servicio.
  eliminarServicio(id: number): void {
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
        this.serviciosService.eliminarServicio(id); // Llama al servicio para eliminar el servicio por ID.
        this.cargarServicios(); // Recarga la lista de servicios.
        Swal.fire({
          title: 'Eliminado!',
          text: 'El servicio ha sido eliminado.',
          icon: 'success',
          confirmButtonText: 'Entendido',
          willClose: () => {
            window.location.reload(); // Recarga la página después de la confirmación.
          },
        });
      }
    });
  }

  // Método para abrir el diálogo de agregar servicio.
  abrirDialogoAgregarServicio(): void {
    const dialogRef = this.dialog.open(AgregarServicioDialogComponent); // Abre el diálogo para agregar un servicio.

    dialogRef.afterClosed().subscribe((nuevoServicio: Servicio) => {
      if (nuevoServicio) {
        this.serviciosService.guardarServicio(nuevoServicio); // Guarda el nuevo servicio en el backend.
        this.cargarServicios(); // Recarga la lista de servicios.
      }
    });
  }

  // Método para abrir el diálogo de edición de un servicio.
  abrirEditarServicio(servicio: Servicio): void {
    const dialogRef = this.dialog.open(EditarServicioDialogComponent, {
      data: servicio, // Pasa los datos del servicio seleccionado al diálogo.
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      this.serviciosService.eliminarServicio(result.id); // Elimina el servicio antiguo.
      this.serviciosService.guardarServicio(result); // Guarda los datos actualizados del servicio.
      this.cargarServicios(); // Recarga la lista de servicios.
    });
  }
}
