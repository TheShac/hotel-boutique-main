import { ComponentFixture, TestBed } from '@angular/core/testing'; // Importa las herramientas necesarias para las pruebas en Angular.

import { FooterComponent } from './footer.component'; // Importa el componente FooterComponent que se va a probar.

describe('FooterComponent', () => { // Describe el conjunto de pruebas para FooterComponent.
  let component: FooterComponent; // Declara una variable para la instancia del componente.
  let fixture: ComponentFixture<FooterComponent>; // Declara una variable para el fixture del componente.

  beforeEach(async () => { // Ejecuta el bloque de código antes de cada prueba.
    await TestBed.configureTestingModule({ // Configura el módulo de pruebas.
      declarations: [ FooterComponent ] // Declara el componente que se va a probar.
    })
    .compileComponents(); // Compila los componentes declarados.

    fixture = TestBed.createComponent(FooterComponent); // Crea una instancia del componente FooterComponent.
    component = fixture.componentInstance; // Asigna la instancia del componente a la variable component.
    fixture.detectChanges(); // Detecta los cambios para inicializar el componente.
  });

  it('should create', () => { // Define una prueba que verifica la creación del componente.
    expect(component).toBeTruthy(); // Comprueba que el componente se haya creado correctamente.
  });
});
