import { Component, OnInit } from '@angular/core'; // Importaciones esenciales de Angular.

@Component({
  selector: 'app-home', // Selector del componente.
  templateUrl: './home.component.html', // Archivo de plantilla asociado.
  styleUrls: ['./home.component.css'], // Archivo de estilos asociado.
})
export class HomeComponent implements OnInit {

  // Método del ciclo de vida que se ejecuta al inicializar el componente.
  ngOnInit(): void {
    this.createSnowflakes(); // Llama al método para crear los copos de nieve.
  }

  // Método para generar copos de nieve animados.
  createSnowflakes() {
    const snowflakesContainer = document.querySelector('.snowflakes'); // Selecciona el contenedor de los copos.
    const numSnowflakes = 50; // Número total de copos de nieve.

    for (let i = 0; i < numSnowflakes; i++) {
      const snowflake = document.createElement('div'); // Crea un nuevo elemento `div` para cada copo.
      snowflake.classList.add('snowflake'); // Asigna la clase CSS `snowflake`.

      // Genera una posición aleatoria en el eje X (0% a 100%).
      const left = Math.random() * 100; 
      snowflake.style.left = `${left}%`;

      // Agrega el copo de nieve al contenedor.
      snowflakesContainer?.appendChild(snowflake);
    }
  }
}
