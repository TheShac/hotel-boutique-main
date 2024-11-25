import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  ngOnInit(): void {
    // Inicialización de la vista si es necesario
  }

  ngAfterViewInit(): void {
    // Inicia la creación de copos de nieve una vez que la vista está cargada
    this.generateSnowflakes();
  }

  generateSnowflakes() {
    const snowflakesContainer = document.querySelector('.snowflakes') as HTMLElement;
    const snowflakeCount = 50;

    // Generar y agregar copos de nieve
    for (let i = 0; i < snowflakeCount; i++) {
      this.createAndAnimateSnowflake(snowflakesContainer);
    }

    // Controlar la visibilidad de la pestaña para pausar o reanudar la nieve
    this.manageTabVisibility();
  }

  createAndAnimateSnowflake(container: HTMLElement) {
    // Crear un copo de nieve con un tamaño aleatorio
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    container.appendChild(snowflake);

    const size = this.getRandomSnowflakeSize();
    const startPositionX = this.getRandomPositionX(size);
    const animationDuration = this.getRandomAnimationDuration();

    // Establecer las propiedades de estilo para el copo de nieve
    snowflake.style.width = `${size}px`;
    snowflake.style.height = `${size}px`;
    snowflake.style.left = `${startPositionX}%`;
    snowflake.style.top = `-${size}px`;

    // Asignar la animación
    snowflake.style.animationDuration = `${animationDuration}s`;
    snowflake.style.animationName = Math.random() > 0.5 ? 'fall' : 'diagonal-fall'; // Alternar entre caídas verticales y diagonales

    
    setTimeout(() => {
      snowflake.remove(); 
    }, animationDuration * 1000);
  }

  // Función para obtener un tamaño aleatorio para el copo de nieve
  private getRandomSnowflakeSize(): number {
    return Math.random() * 5 + 2; // Tamaño entre 2px y 7px
  }

  // Función para obtener una posición aleatoria en el eje X
  private getRandomPositionX(size: number): number {
    return Math.random() * (100 - size); // Posición dentro de la pantalla
  }

  // Función para obtener una duración aleatoria para la animación de caída
  private getRandomAnimationDuration(): number {
    return Math.random() * 5 + 3; // Duración entre 3s y 8s
  }

  manageTabVisibility() {
    let isActive = !document.hidden;

    // Cuando la pestaña se vuelve visible, generar copos de nieve
    document.addEventListener('visibilitychange', () => {
      isActive = !document.hidden;
      if (isActive) {
        this.generateSnowflakes(); // Genera nuevos copos si la pestaña es visible
      }
    });
  }
}



