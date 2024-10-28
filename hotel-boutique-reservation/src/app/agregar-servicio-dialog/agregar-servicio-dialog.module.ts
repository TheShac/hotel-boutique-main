import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgregarServicioDialogComponent } from './agregar-servicio-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AgregarServicioDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
  ],
  exports: [AgregarServicioDialogComponent],
})
export class AgregarServicioDialogModule {}
