import { ComponentFixture, TestBed } from '@angular/core/testing'; // Herramientas principales para pruebas unitarias.
import { PerfilUsuarioComponent } from './perfil-usuario.component'; // Componente que se está probando.

describe('PerfilUsuarioComponent', () => {
  let component: PerfilUsuarioComponent; // Instancia del componente bajo prueba.
  let fixture: ComponentFixture<PerfilUsuarioComponent>; // Contenedor de pruebas para el componente.

  // Configuración inicial del entorno de pruebas.
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerfilUsuarioComponent], // Declara el componente dentro del módulo de pruebas.
    }).compileComponents(); // Compila el componente y sus dependencias.

    // Inicializa la instancia del componente y el contenedor.
    fixture = TestBed.createComponent(PerfilUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Aplica los cambios iniciales al componente.
  });

  // Prueba unitaria para verificar que el componente se crea correctamente.
  it('should create', () => {
    expect(component).toBeTruthy(); // Valida que la instancia del componente es válida.
  });
});
