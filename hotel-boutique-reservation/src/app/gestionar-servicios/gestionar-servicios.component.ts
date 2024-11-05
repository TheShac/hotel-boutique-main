import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Servicio } from '../models/servicio';
import { ServiciosService } from '../services/servicios.service';
import { MatDialog } from '@angular/material/dialog';
import { AgregarServicioDialogComponent } from '../agregar-servicio-dialog/agregar-servicio-dialog.component';
import Swal from 'sweetalert2';
import { EditarServicioDialogComponent } from '../editar-servicio-dialog/editar-servicio-dialog.component';

@Component({
  selector: 'app-gestionar-servicios',
  templateUrl: './gestionar-servicios.component.html',
  styleUrls: ['./gestionar-servicios.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class GestionarServiciosComponent implements OnInit {
  servicios: Servicio[] = [];

  // Inyección de MatDialog
  constructor(
    private serviciosService: ServiciosService,
    private dialog: MatDialog
  ) {}

  servicio: Servicio = {
    id: 0,
    nombre: '',
    descripcion: '',
    precio: 0,
  };

  ngOnInit(): void {
    this.cargarServicios();
  }

  cargarServicios(): void {
    this.serviciosService.getServicios().subscribe((data) => {
      this.servicios = data;
    });
  }

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
        console.log(id);
        this.serviciosService.eliminarServicio(id);
        this.cargarServicios();
        Swal.fire({
          title: 'Eliminado!',
          text: 'El Servicio ha sido eliminada.',
          icon: 'success',
          confirmButtonText: 'Entendido',
          willClose: () => {
            window.location.reload();
          },
        });
      }
    });
    this.cargarServicios();
  }

  abrirDialogoAgregarServicio(): void {
    const dialogRef = this.dialog.open(AgregarServicioDialogComponent);

    dialogRef.afterClosed().subscribe((nuevoServicio: Servicio) => {
      if (nuevoServicio) {
        // Lógica para agregar el nuevo servicio a la lista
        //this.servicios.push(nuevoServicio);
        this.serviciosService.guardarServicio(nuevoServicio);

        // Aquí también puedes llamar a un servicio para guardar el nuevo servicio en el backend
      }
    });
  }

  abrirEditarServicio(servicio: Servicio): void {
    const dialogRef = this.dialog.open(EditarServicioDialogComponent, {
      data: servicio,
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      this.serviciosService.eliminarServicio(result.id);
      this.serviciosService.guardarServicio(result);
      this.cargarServicios();
    });
  }
}