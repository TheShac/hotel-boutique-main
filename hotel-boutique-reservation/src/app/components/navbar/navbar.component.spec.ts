import { ComponentFixture, TestBed } from '@angular/core/testing'; // Importa las herramientas necesarias para realizar pruebas en Angular.
import { NavbarComponent } from './navbar.component'; // Importa el componente Navbar que se va a probar.

describe('NavbarComponent', () => { // Describe un conjunto de pruebas para el NavbarComponent.
  let component: NavbarComponent; // Declara la variable que contendrá la instancia del componente.
  let fixture: ComponentFixture<NavbarComponent>; // Declara la variable que contendrá el fixture de pruebas.

  beforeEach(async () => { // Configura el entorno de prueba antes de cada prueba.
    await TestBed.configureTestingModule({
      declarations: [ NavbarComponent ] // Declara el componente que se va a probar.
    })
    .compileComponents(); // Compila los componentes declarados.
  
    fixture = TestBed.createComponent(NavbarComponent); // Crea una instancia del componente para pruebas.
    component = fixture.componentInstance; // Obtiene la instancia del componente.
    fixture.detectChanges(); // Detecta los cambios iniciales en la vista del componente.
  });

  it('should create', () => { // Define una prueba individual.
    expect(component).toBeTruthy(); // Verifica que la instancia del componente se haya creado correctamente.
  });
});
