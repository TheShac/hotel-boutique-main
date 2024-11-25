/* tslint:disable:no-unused-variable */
// Deshabilita la regla de TSLint que genera advertencias por variables no usadas.

import { async, ComponentFixture, TestBed } from '@angular/core/testing'; // Herramientas principales para pruebas unitarias.
import { By } from '@angular/platform-browser'; // Herramientas para realizar consultas en el DOM durante las pruebas.
import { DebugElement } from '@angular/core'; // Proporciona acceso a elementos de depuración del DOM.

import { EditarServicioDialogComponent } from './editar-servicio-dialog.component'; // Componente bajo prueba.

describe('EditarServicioDialogComponent', () => {
  let component: EditarServicioDialogComponent; // Instancia del componente.
  let fixture: ComponentFixture<EditarServicioDialogComponent>; // Contenedor de pruebas para el componente.

  // Configuración del módulo de pruebas antes de ejecutar las pruebas.
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditarServicioDialogComponent], // Declara el componente dentro del módulo de pruebas.
    }).compileComponents(); // Compila el componente y sus dependencias.
  }));

  // Inicialización del componente antes de cada prueba.
  beforeEach(() => {
    fixture = TestBed.createComponent(EditarServicioDialogComponent); // Crea una instancia del contenedor de pruebas.
    component = fixture.componentInstance; // Asigna la instancia del componente al contenedor.
    fixture.detectChanges(); // Aplica los cambios iniciales al componente.
  });

  // Prueba unitaria para verificar que el componente se crea correctamente.
  it('should create', () => {
    expect(component).toBeTruthy(); // Verifica que la instancia del componente es válida.
  });
});
