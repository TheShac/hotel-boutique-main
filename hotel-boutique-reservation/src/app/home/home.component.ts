import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  ngOnInit(): void {
    this.createSnowflakes(); 
  }

  createSnowflakes() {
    const snowflakesContainer = document.querySelector('.snowflakes');
    const numSnowflakes = 50; 

    for (let i = 0; i < numSnowflakes; i++) {
      const snowflake = document.createElement('div');
      snowflake.classList.add('snowflake');

      // Genera una posición aleatoria en el eje X
      const left = Math.random() * 100; 
      snowflake.style.left = `${left}%`;

      // Agrega el copo de nieve al contenedor
      snowflakesContainer?.appendChild(snowflake);
    }
  }
}

