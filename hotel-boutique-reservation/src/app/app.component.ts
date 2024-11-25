import { Component } from '@angular/core'; // Importa el decorador para definir un componente de Angular.

@Component({
  selector: 'app-root', // Selector del componente que se utiliza en el HTML raíz.
  templateUrl: './app.component.html', // Ruta del archivo HTML asociado al componente.
  styleUrls: ['./app.component.css'], // Ruta del archivo CSS asociado al componente.
})
export class AppComponent {
  title = 'hotel-boutique-reservation'; // Título de la aplicación, utilizado como ejemplo de propiedad.
}
