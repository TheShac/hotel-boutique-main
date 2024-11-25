import { NgModule } from '@angular/core'; // Importa el decorador NgModule para definir un módulo.
import { CommonModule } from '@angular/common'; // Proporciona directivas y servicios básicos de Angular.
import { EditarHabitacionComponent } from './editar-habitacion.component'; // Importa el componente que pertenece a este módulo.
import { MatFormFieldModule } from '@angular/material/form-field'; // Módulo para contenedores de campos de formulario de Angular Material.
import { MatInputModule } from '@angular/material/input'; // Módulo para campos de entrada de Angular Material.
import { MatButtonModule } from '@angular/material/button'; // Módulo para botones de Angular Material.
import { MatDialogModule } from '@angular/material/dialog'; // Módulo para diálogos de Angular Material.
import { FormsModule } from '@angular/forms'; // Módulo para formularios en Angular.

@NgModule({
  declarations: [
    EditarHabitacionComponent, // Declara el componente asociado con este módulo.
  ],
  imports: [
    CommonModule, // Importa funcionalidades básicas de Angular.
    FormsModule, // Proporciona soporte para formularios reactivos y template-driven.
    MatFormFieldModule, // Permite el uso de contenedores para campos de formulario.
    MatInputModule, // Habilita los campos de entrada.
    MatButtonModule, // Habilita el uso de botones estilizados.
    MatDialogModule, // Habilita la funcionalidad de diálogos.
  ],
  exports: [
    EditarHabitacionComponent, // Exporta el componente para que otros módulos puedan usarlo.
  ],
})
export class EditarHabitacionModule {}
