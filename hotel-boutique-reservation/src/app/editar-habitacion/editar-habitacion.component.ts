import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Habitacion } from '../models/habitacion';

@Component({
  selector: 'app-editar-habitacion',
  templateUrl: './editar-habitacion.component.html',
  styleUrls: ['./editar-habitacion.component.css'],
})
export class EditarHabitacionComponent {
  constructor(
    public dialogRef: MatDialogRef<EditarHabitacionComponent>,
    @Inject(MAT_DIALOG_DATA) public habitacion: Habitacion
  ) {}

  guardar(): void {
    this.dialogRef.close(this.habitacion); // Cierra el diálogo y devuelve los datos
  }
}
