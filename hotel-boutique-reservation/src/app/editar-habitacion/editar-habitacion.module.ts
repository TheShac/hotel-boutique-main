import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditarHabitacionComponent } from './editar-habitacion.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [EditarHabitacionComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule, // Asegúrate de importar el módulo de mat-form-field
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
  ],
  exports: [EditarHabitacionComponent],
})
export class EditarHabitacionModule {}
