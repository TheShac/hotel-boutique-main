import { ComponentFixture, TestBed } from '@angular/core/testing'; // Herramientas principales para pruebas unitarias.
import { RegisterComponent } from './register.component'; // Importa el componente que se va a probar.

describe('RegisterComponent', () => {
  let component: RegisterComponent; // Instancia del componente bajo prueba.
  let fixture: ComponentFixture<RegisterComponent>; // Contenedor de pruebas para el componente.

  // Configuración inicial para el entorno de pruebas.
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent], // Declara el componente dentro del módulo de pruebas.
    }).compileComponents(); // Compila el componente y sus dependencias.

    // Inicializa la instancia del componente y el contenedor de pruebas.
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Aplica los cambios iniciales al componente.
  });

  // Prueba unitaria para verificar que el componente se crea correctamente.
  it('should create', () => {
    expect(component).toBeTruthy(); // Valida que la instancia del componente es válida.
  });
});
