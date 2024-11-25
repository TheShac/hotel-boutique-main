import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  
import { RouterModule, Routes } from '@angular/router';  
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AdministradorComponent } from './administrador/administrador.component';
import { CatalogoHabitacionesComponent } from './catalogo-habitaciones/catalogo-habitaciones.component';
import { CarritoComprasComponent } from './carrito-compras/carrito-compras.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HabitacionDetalleComponent } from './habitacion-detalle/habitacion-detalle.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { GestionarServiciosComponent } from './gestionar-servicios/gestionar-servicios.component';

import { EditarHabitacionModule } from './editar-habitacion/editar-habitacion.module';
import { AgregarServicioDialogModule } from './agregar-servicio-dialog/agregar-servicio-dialog.module';
import { EditarServicioDialogComponent } from './editar-servicio-dialog/editar-servicio-dialog.component';
import { AppRoutingModule } from './app-routing.module';
import { EmpleadoComponent } from './empleado/empleado.component';
import { PagarComponent } from './pagar/pagar.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdministradorComponent,
    CatalogoHabitacionesComponent,
    CarritoComprasComponent,
    PerfilUsuarioComponent,
    LoginComponent,
    RegisterComponent,
    HabitacionDetalleComponent,
    NavbarComponent,
    FooterComponent,
    GestionarServiciosComponent,
    EditarServicioDialogComponent,
    EmpleadoComponent,
    PagarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    EditarHabitacionModule,
    AgregarServicioDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
