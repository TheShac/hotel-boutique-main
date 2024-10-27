/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GestionHabitacionesService } from './gestionHabitaciones.service';

describe('Service: GestionHabitaciones', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GestionHabitacionesService]
    });
  });

  it('should ...', inject([GestionHabitacionesService], (service: GestionHabitacionesService) => {
    expect(service).toBeTruthy();
  }));
});
