import { NgModule } from '@angular/core'; // Importa el decorador NgModule para declarar un módulo.
import { CommonModule } from '@angular/common'; // Proporciona funcionalidades comunes como directivas (ngIf, ngFor).
import { AgregarServicioDialogComponent } from './agregar-servicio-dialog.component'; // Importa el componente principal de este módulo.
import { MatFormFieldModule } from '@angular/material/form-field'; // Importa el módulo de campos de formulario de Angular Material.
import { MatInputModule } from '@angular/material/input'; // Importa el módulo de campos de entrada de Angular Material.
import { MatButtonModule } from '@angular/material/button'; // Importa el módulo de botones de Angular Material.
import { MatDialogModule } from '@angular/material/dialog'; // Importa el módulo para gestionar diálogos de Angular Material.
import { FormsModule } from '@angular/forms'; // Importa el módulo para manejar formularios en Angular.

@NgModule({
  declarations: [
    AgregarServicioDialogComponent, // Declara el componente que pertenece a este módulo.
  ],
  imports: [
    CommonModule, // Importa funcionalidades comunes de Angular.
    FormsModule, // Importa soporte para formularios.
    MatFormFieldModule, // Habilita el uso de campos de formulario de Angular Material.
    MatInputModule, // Habilita el uso de campos de entrada.
    MatButtonModule, // Habilita el uso de botones.
    MatDialogModule, // Habilita el uso de diálogos.
  ],
  exports: [
    AgregarServicioDialogComponent, // Exporta el componente para que pueda ser utilizado en otros módulos.
  ],
})
export class AgregarServicioDialogModule {}
