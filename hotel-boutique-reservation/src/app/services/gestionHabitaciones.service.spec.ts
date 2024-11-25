/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing'; // Herramientas para configurar y realizar pruebas unitarias.
import { GestionHabitacionesService } from './gestionHabitaciones.service'; // Servicio bajo prueba.

describe('Service: GestionHabitaciones', () => {
  // Configuración inicial para el entorno de pruebas.
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GestionHabitacionesService], // Proporciona el servicio para el módulo de pruebas.
    });
  });

  // Prueba unitaria para verificar que el servicio se crea correctamente.
  it('should create the service', inject([GestionHabitacionesService], (service: GestionHabitacionesService) => {
    expect(service).toBeTruthy(); // Valida que la instancia del servicio no sea nula ni indefinida.
  }));
});
