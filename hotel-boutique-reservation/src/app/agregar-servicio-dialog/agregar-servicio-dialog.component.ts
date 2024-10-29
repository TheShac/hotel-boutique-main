import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Servicio } from '../models/servicio';
import { ServiciosService } from '../services/servicios.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-agregar-servicio-dialog',
  templateUrl: './agregar-servicio-dialog.component.html',
  styleUrls: ['./agregar-servicio-dialog.component.css'],
})
export class AgregarServicioDialogComponent {
  servicio: Servicio = {
    id: 0,
    nombre: '',
    descripcion: '',
    precio: 0,
  };

  constructor(
    private dialogRef: MatDialogRef<AgregarServicioDialogComponent>
  ) {}

  agregarServicio(): void {
    if (this.isValidServicio(this.servicio)) {
      this.dialogRef.close(this.servicio);
      console.log(this.servicio);
    } else {
      alert('Por favor, completa todos los campos requeridos.');
    }
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  private isValidServicio(servicio: Servicio): boolean {
    return !!(
      servicio.nombre &&
      servicio.descripcion &&
      servicio.precio != null &&
      servicio.precio >= 0
    );
  }
}
