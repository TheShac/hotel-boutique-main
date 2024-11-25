import { ComponentFixture, TestBed } from '@angular/core/testing'; // Importa las herramientas necesarias para pruebas en Angular.
import { AdministradorComponent } from './administrador.component'; // Importa el componente que se va a probar.

// Descripción del conjunto de pruebas para el componente AdministradorComponent
describe('AdministradorComponent', () => {
  let component: AdministradorComponent; // Variable que contendrá la instancia del componente a probar.
  let fixture: ComponentFixture<AdministradorComponent>; // Variable que representará el entorno de pruebas para el componente.

  // Configuración inicial que se ejecuta antes de cada prueba.
  beforeEach(async () => {
    // Configuración del módulo de pruebas con el componente a probar.
    await TestBed.configureTestingModule({
      declarations: [ AdministradorComponent ] // Declara el componente dentro del módulo de pruebas.
    }).compileComponents(); // Compila los componentes declarados para que estén disponibles en las pruebas.

    // Crea una instancia del fixture y del componente.
    fixture = TestBed.createComponent(AdministradorComponent); // Crea una instancia del componente para realizar las pruebas.
    component = fixture.componentInstance; // Obtiene la instancia del componente.
    fixture.detectChanges(); // Aplica los cambios iniciales para renderizar el componente.
  });

  // Caso de prueba: verifica que el componente se crea correctamente.
  it('should create', () => {
    expect(component).toBeTruthy(); // Verifica que la instancia del componente sea válida (verdadera).
  });
});
