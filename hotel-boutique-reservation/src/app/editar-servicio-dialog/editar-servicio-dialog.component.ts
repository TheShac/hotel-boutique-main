import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Servicio } from '../models/servicio';
import { ServiciosService } from '../services/servicios.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-editar-servicio-dialog',
  templateUrl: './editar-servicio-dialog.component.html',
  styleUrls: ['./editar-servicio-dialog.component.css'],
})
export class EditarServicioDialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<EditarServicioDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public servicio: Servicio
  ) {}

  guardar(): void {
    this.dialogRef.close(this.servicio); // Cierra el diálogo y devuelve los datos
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  ngOnInit() {}
}
