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


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'perfil', component: PerfilUsuarioComponent },
  { path: 'catalogo', component: CatalogoHabitacionesComponent },
  { path: 'carrito', component: CarritoComprasComponent },
  { path: 'admin', component: AdministradorComponent },
  { path: 'habitacion/:id', component: HabitacionDetalleComponent },
  { path: 'gestionServicios', component: GestionarServiciosComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

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
    EditarServicioDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),  
    HttpClientModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    EditarHabitacionModule,
    AgregarServicioDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
