import { ComponentFixture, TestBed } from '@angular/core/testing'; // Importa herramientas de pruebas unitarias.
import { HomeComponent } from './home.component'; // Importa el componente que será probado.

describe('HomeComponent', () => {
  let component: HomeComponent; // Instancia del componente a probar.
  let fixture: ComponentFixture<HomeComponent>; // Contenedor de pruebas del componente.

  // Configuración inicial para las pruebas.
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent], // Declara el componente dentro del módulo de pruebas.
    }).compileComponents(); // Compila el componente y sus dependencias.

    // Inicializa la instancia del componente y su contenedor.
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Aplica los cambios iniciales al componente.
  });

  // Prueba unitaria para verificar que el componente se crea correctamente.
  it('should create', () => {
    expect(component).toBeTruthy(); // Verifica que la instancia del componente es válida.
  });
});
