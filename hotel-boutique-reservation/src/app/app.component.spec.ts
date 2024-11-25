import { TestBed } from '@angular/core/testing'; // Herramientas para configurar el entorno de pruebas.
import { RouterTestingModule } from '@angular/router/testing'; // Módulo de pruebas para manejar rutas en Angular.
import { AppComponent } from './app.component'; // Componente principal bajo prueba.

describe('AppComponent', () => {
  // Configuración inicial del entorno de pruebas.
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, // Importa el módulo de pruebas para manejar la funcionalidad de rutas.
      ],
      declarations: [
        AppComponent, // Declara el componente bajo prueba.
      ],
    }).compileComponents(); // Compila el componente y sus dependencias.
  });

  // Prueba unitaria para verificar que el componente se crea correctamente.
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent); // Crea una instancia del componente en el entorno de pruebas.
    const app = fixture.componentInstance; // Obtiene la instancia del componente.
    expect(app).toBeTruthy(); // Verifica que el componente es válido.
  });

  // Prueba unitaria para verificar que la propiedad `title` tiene el valor esperado.
  it(`should have as title 'hotel-boutique-reservation'`, () => {
    const fixture = TestBed.createComponent(AppComponent); // Crea una instancia del componente en el entorno de pruebas.
    const app = fixture.componentInstance; // Obtiene la instancia del componente.
    expect(app.title).toEqual('hotel-boutique-reservation'); // Verifica que el título coincide con el valor esperado.
  });

  // Prueba unitaria para verificar que el título se renderiza correctamente en el HTML.
  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent); // Crea una instancia del componente en el entorno de pruebas.
    fixture.detectChanges(); // Aplica los cambios iniciales al componente.
    const compiled = fixture.nativeElement as HTMLElement; // Obtiene el HTML renderizado del componente.
    expect(compiled.querySelector('.content span')?.textContent).toContain('hotel-boutique-reservation app is running!'); // Verifica que el texto esperado está presente en el DOM.
  });
});
