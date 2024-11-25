import { ComponentFixture, TestBed } from '@angular/core/testing'; // Importa herramientas de pruebas unitarias.
import { LoginComponent } from './login.component'; // Importa el componente que será probado.

describe('LoginComponent', () => {
  let component: LoginComponent; // Instancia del componente a probar.
  let fixture: ComponentFixture<LoginComponent>; // Contenedor de pruebas del componente.

  // Configuración inicial para las pruebas.
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent], // Declara el componente dentro del módulo de pruebas.
    }).compileComponents(); // Compila el componente y sus dependencias.

    // Inicializa la instancia del componente y su contenedor.
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Aplica los cambios iniciales al componente.
  });

  // Prueba unitaria para verificar que el componente se crea correctamente.
  it('should create', () => {
    expect(component).toBeTruthy(); // Verifica que la instancia del componente es válida.
  });
});
