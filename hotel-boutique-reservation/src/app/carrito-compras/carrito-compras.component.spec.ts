import { ComponentFixture, TestBed } from '@angular/core/testing'; // Importaciones necesarias para las pruebas

import { CarritoComprasComponent } from './carrito-compras.component'; // Importar el componente que se va a probar

// Describe un grupo de pruebas para el componente CarritoComprasComponent
describe('CarritoComprasComponent', () => {
  let component: CarritoComprasComponent; // Declaración de la variable que contendrá la instancia del componente
  let fixture: ComponentFixture<CarritoComprasComponent>; // Declaración de la variable que contendrá el fixture del componente

  // Configura el entorno de pruebas antes de cada caso de prueba
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarritoComprasComponent ] // Declarar el componente que se va a probar
    })
    .compileComponents(); // Compila los componentes declarados

    // Crea una instancia del componente y del fixture
    fixture = TestBed.createComponent(CarritoComprasComponent);
    component = fixture.componentInstance; // Asigna la instancia del componente
    fixture.detectChanges(); // Detecta los cambios en el fixture
  });

  // Caso de prueba para verificar que el componente se crea correctamente
  it('should create', () => {
    expect(component).toBeTruthy(); // Verifica que la instancia del componente sea verdadera (exista)
  });
});
