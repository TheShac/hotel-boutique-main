import { TestBed } from '@angular/core/testing'; // Herramientas para configurar y realizar pruebas unitarias.
import { AuthService } from './auth.service'; // Servicio que será probado.

describe('AuthService', () => {
  let service: AuthService; // Instancia del servicio bajo prueba.

  // Configuración inicial del entorno de pruebas.
  beforeEach(() => {
    TestBed.configureTestingModule({
      // Configuración del módulo de pruebas.
      providers: [AuthService], // Proporciona el servicio `AuthService` para pruebas.
    });
    service = TestBed.inject(AuthService); // Inyecta una instancia del servicio para su uso en las pruebas.
  });

  // Verifica que el servicio se crea correctamente.
  it('should be created', () => {
    expect(service).toBeTruthy(); // Valida que la instancia del servicio no sea nula ni indefinida.
  });
});
