import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmpleadoComponent } from './empleado.component';

describe('EmpleadoComponent', () => {
  let component: EmpleadoComponent;
  let fixture: ComponentFixture<EmpleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmpleadoComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(EmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete a reservation', () => {
    const reserva = component.reservas[0];
    component.eliminarReserva(reserva);
    expect(component.reservas).not.toContain(reserva);
  });

  it('should delete a service from a reservation', () => {
    const reserva = component.reservas[0];
    const servicio = reserva.servicios[0];
    component.eliminarServicio(reserva, servicio);
    expect(reserva.servicios).not.toContain(servicio);
  });
});
