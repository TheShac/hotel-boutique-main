import { TestBed } from '@angular/core/testing'; // Herramientas para configurar el entorno de pruebas.
import { AuthGuard } from './auth.guard'; // Servicio `AuthGuard` que se está probando.

describe('AuthGuard', () => {
  let guard: AuthGuard; // Instancia del guard para pruebas.

  // Configuración inicial del entorno de pruebas.
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard], // Proporciona el guard en el módulo de pruebas.
    });
    guard = TestBed.inject(AuthGuard); // Inyecta la instancia del guard.
  });

  // Verifica que la instancia del guard se crea correctamente.
  it('should be created', () => {
    expect(guard).toBeTruthy(); // Valida que la instancia no sea `null` ni `undefined`.
  });
});
