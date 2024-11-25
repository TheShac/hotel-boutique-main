import { ComponentFixture, TestBed } from '@angular/core/testing'; // Herramientas principales para realizar pruebas unitarias.
import { HabitacionDetalleComponent } from './habitacion-detalle.component'; // Componente que se está probando.

describe('HabitacionDetalleComponent', () => {
  let component: HabitacionDetalleComponent; // Instancia del componente.
  let fixture: ComponentFixture<HabitacionDetalleComponent>; // Contenedor de pruebas para el componente.

  // Configuración del módulo de pruebas antes de ejecutar los casos de prueba.
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HabitacionDetalleComponent], // Declara el componente dentro del módulo de pruebas.
    }).compileComponents(); // Compila el componente y sus dependencias necesarias.

    // Inicializa el componente y el contenedor de pruebas.
    fixture = TestBed.createComponent(HabitacionDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Aplica los cambios iniciales al componente.
  });

  // Prueba unitaria para verificar que el componente se crea correctamente.
  it('should create', () => {
    expect(component).toBeTruthy(); // Valida que la instancia del componente sea válida.
  });
});
