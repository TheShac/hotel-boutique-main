import { Component } from '@angular/core'; // Importa el decorador Component desde Angular core.

@Component({
  selector: 'app-footer', // Define el selector del componente, que se usará en la plantilla HTML.
  templateUrl: './footer.component.html', // Especifica la ruta del archivo HTML que define la vista del componente.
  styleUrls: ['./footer.component.css'] // Especifica la ruta del archivo CSS que contiene los estilos del componente.
})
export class FooterComponent { // Declara la clase del componente.
  // Aquí se pueden agregar propiedades y métodos adicionales para el componente en el futuro.
}
