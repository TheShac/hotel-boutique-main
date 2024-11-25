import { Component, Inject, OnInit } from '@angular/core'; // Importaciones esenciales para componentes Angular.
import { MatDialogRef } from '@angular/material/dialog'; // Herramienta para manejar diálogos modales.
import { Servicio } from '../models/servicio'; // Modelo que representa un servicio.
import { MAT_DIALOG_DATA } from '@angular/material/dialog'; // Token para inyectar datos en el diálogo.

@Component({
  selector: 'app-editar-servicio-dialog', // Selector del componente.
  templateUrl: './editar-servicio-dialog.component.html', // Archivo de plantilla asociado.
  styleUrls: ['./editar-servicio-dialog.component.css'], // Archivo de estilos asociado.
})
export class EditarServicioDialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<EditarServicioDialogComponent>, // Referencia al diálogo para controlarlo.
    @Inject(MAT_DIALOG_DATA) public servicio: Servicio // Datos inyectados en el diálogo (información del servicio a editar).
  ) {}

  // Método para guardar los cambios realizados y cerrar el diálogo.
  guardar(): void {
    this.dialogRef.close(this.servicio); // Devuelve los datos del servicio actualizado al componente padre.
  }

  // Método para cancelar la edición y cerrar el diálogo.
  cancelar(): void {
    this.dialogRef.close(); // Cierra el diálogo sin devolver datos.
  }

  // Método que se ejecuta al inicializar el componente.
  ngOnInit() {}
}
