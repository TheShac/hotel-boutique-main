import { Component } from '@angular/core'; // Importa el decorador Component de Angular
import { MatDialogRef } from '@angular/material/dialog'; // Importa MatDialogRef para manejar la referencia del diálogo
import { Servicio } from '../models/servicio'; // Importa el modelo de Servicio
import { ServiciosService } from '../services/servicios.service'; // Importa el servicio de Servicios
import { MAT_DIALOG_DATA } from '@angular/material/dialog'; // Importa MAT_DIALOG_DATA para recibir datos en el diálogo

@Component({
  selector: 'app-agregar-servicio-dialog', // Selector del componente
  templateUrl: './agregar-servicio-dialog.component.html', // Ruta al template HTML del componente
  styleUrls: ['./agregar-servicio-dialog.component.css'], // Estilos CSS del componente
})
export class AgregarServicioDialogComponent {
  // Inicializa un objeto servicio con valores predeterminados
  servicio: Servicio = {
    id: 0, // ID inicial de la servicio
    nombre: '', // Nombre de la servicio
    descripcion: '', // Descripción de la servicio
    precio: 0, // Precio de la servicio
  };

  constructor(
    private dialogRef: MatDialogRef<AgregarServicioDialogComponent> // Inyecta la referencia del diálogo
  ) {}

  // Método para agregar un servicio
  agregarServicio(): void {
    // Verifica si el servicio es válido antes de cerrarlo
    if (this.isValidServicio(this.servicio)) {
      this.dialogRef.close(this.servicio); // Cierra el diálogo y devuelve el objeto servicio
      console.log(this.servicio); // Muestra el objeto servicio en la consola
    } else {
      // Si el servicio no es válido, muestra un alerta
      alert('Por favor, completa todos los campos requeridos.');
    }
  }

  // Método para cancelar la acción y cerrar el diálogo
  cancelar(): void {
    this.dialogRef.close(); // Cierra el diálogo sin devolver ningún valor
  }

  // Método privado para validar el objeto servicio
  private isValidServicio(servicio: Servicio): boolean {
    // Verifica que todos los campos requeridos estén completos y el precio no sea negativo
    return !!(
      servicio.nombre && // Verifica que el nombre no esté vacío
      servicio.descripcion && // Verifica que la descripción no esté vacía
      servicio.precio != null && // Verifica que el precio no sea nulo
      servicio.precio >= 0 // Verifica que el precio no sea negativo
    );
  }
}
