import { ComponentFixture, TestBed } from '@angular/core/testing'; // Herramientas principales para pruebas unitarias.
import { EmpleadoComponent } from './empleado.component'; // Componente bajo prueba.

describe('EmpleadoComponent', () => {
  let component: EmpleadoComponent; // Instancia del componente.
  let fixture: ComponentFixture<EmpleadoComponent>; // Contenedor de pruebas para el componente.

  // Configuración inicial antes de ejecutar las pruebas.
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmpleadoComponent], // Declara el componente dentro del módulo de pruebas.
    }).compileComponents(); // Compila el componente y sus dependencias.

    fixture = TestBed.createComponent(EmpleadoComponent); // Crea una instancia del contenedor de pruebas.
    component = fixture.componentInstance; // Asigna la instancia del componente al contenedor.
    fixture.detectChanges(); // Aplica los cambios iniciales al componente.
  });

  // Verifica que el componente se crea correctamente.
  it('should create', () => {
    expect(component).toBeTruthy(); // Valida que la instancia del componente sea válida.
  });

  // Prueba unitaria: eliminar una reserva.
  it('should delete a reservation', () => {
    const reserva = component.reservas[0]; // Selecciona la primera reserva.
    component.eliminarReserva(reserva); // Llama al método para eliminar la reserva.
    expect(component.reservas).not.toContain(reserva); // Verifica que la reserva eliminada ya no está en la lista.
  });

  // Prueba unitaria: eliminar un servicio de una reserva.
  it('should delete a service from a reservation', () => {
    const reserva = component.reservas[0]; // Selecciona la primera reserva.
    const servicio = reserva.servicios[0]; // Selecciona el primer servicio de la reserva.
    component.eliminarServicio(reserva, servicio); // Llama al método para eliminar el servicio.
    expect(reserva.servicios).not.toContain(servicio); // Verifica que el servicio eliminado ya no está en la lista.
  });
});
