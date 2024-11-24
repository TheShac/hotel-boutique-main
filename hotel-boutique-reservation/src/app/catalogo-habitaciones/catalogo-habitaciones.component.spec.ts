import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoHabitacionesComponent } from './catalogo-habitaciones.component';

// Describe el conjunto de pruebas para el componente CatalogoHabitacionesComponent
describe('CatalogoHabitacionesComponent', () => {
  let component: CatalogoHabitacionesComponent; // Instancia del componente a probar
  let fixture: ComponentFixture<CatalogoHabitacionesComponent>; // Fixture para interactuar con el componente

  // Configura el entorno de pruebas antes de cada prueba individual
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogoHabitacionesComponent ], // Declara el componente a probar
      imports: [ CommonModule ] // Importa CommonModule si es necesario en el componente
    })
    .compileComponents(); // Compila los componentes declarados para las pruebas

    // Crea una instancia del componente y aplica detección de cambios inicial
    fixture = TestBed.createComponent(CatalogoHabitacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Detecta y aplica cambios en la plantilla del componente
  });

  // Prueba que verifica si el componente se crea correctamente
  it('should create', () => {
    expect(component).toBeTruthy(); // Comprueba que la instancia del componente exista
  });

  // Prueba adicional para verificar que se renderiza el título del catálogo en el HTML
  it('should render the catalog title', () => {
    const compiled = fixture.nativeElement as HTMLElement; // Obtiene el HTML renderizado del componente
    expect(compiled.querySelector('h1')?.textContent).toContain('Catalogo de Habitaciones'); 
    // Verifica que el contenido del título contenga el texto esperado
  });
});
