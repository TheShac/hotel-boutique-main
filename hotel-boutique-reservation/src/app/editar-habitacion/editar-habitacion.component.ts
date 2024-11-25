import { Component, Inject } from '@angular/core'; // Importa decoradores y herramientas esenciales de Angular.
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'; // Herramientas para manejar diálogos.
import { Habitacion } from '../models/habitacion'; // Modelo de datos para las habitaciones.

@Component({
  selector: 'app-editar-habitacion', // Selector del componente.
  templateUrl: './editar-habitacion.component.html', // Archivo de plantilla asociado.
  styleUrls: ['./editar-habitacion.component.css'], // Archivo de estilos asociado.
})
export class EditarHabitacionComponent {
  constructor(
    public dialogRef: MatDialogRef<EditarHabitacionComponent>, // Referencia al diálogo actual.
    @Inject(MAT_DIALOG_DATA) public habitacion: Habitacion // Datos inyectados en el diálogo (información de la habitación).
  ) {}

  // Método para guardar los cambios y cerrar el diálogo.
  guardar(): void {
    this.dialogRef.close(this.habitacion); // Cierra el diálogo y devuelve los datos actualizados de la habitación.
  }
}
