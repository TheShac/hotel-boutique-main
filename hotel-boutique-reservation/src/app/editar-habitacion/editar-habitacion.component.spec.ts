import { ComponentFixture, TestBed } from '@angular/core/testing'; // Importa herramientas para realizar pruebas unitarias.
import { EditarHabitacionComponent } from './editar-habitacion.component'; // Importa el componente que se va a probar.

// Conjunto de pruebas para el componente `EditarHabitacionComponent`
describe('EditarHabitacionComponent', () => {
  let component: EditarHabitacionComponent; // Instancia del componente bajo prueba.
  let fixture: ComponentFixture<EditarHabitacionComponent>; // Contenedor de prueba para el componente.

  // Configuración inicial que se ejecuta antes de cada prueba.
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarHabitacionComponent], // Declara el componente dentro del módulo de pruebas.
    })
      .compileComponents(); // Compila el componente y sus dependencias.

    fixture = TestBed.createComponent(EditarHabitacionComponent); // Crea la instancia del contenedor de prueba.
    component = fixture.componentInstance; // Obtiene la instancia del componente.
    fixture.detectChanges(); // Aplica los cambios iniciales al componente.
  });

  // Prueba unitaria para verificar que el componente se crea correctamente.
  it('should create', () => {
    expect(component).toBeTruthy(); // Valida que la instancia del componente sea válida.
  });
});
