import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';  // Asegúrate de tener FormsModule
import { RouterModule, Routes } from '@angular/router';  // Asegúrate de importar RouterModule
import { HttpClientModule } from '@angular/common/http';

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
import { EditarHabitacionModule } from './editar-habitacion/editar-habitacion.module';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'perfil', component: PerfilUsuarioComponent },
  { path: 'catalogo', component: CatalogoHabitacionesComponent },
  { path: 'carrito', component: CarritoComprasComponent },
  { path: 'admin', component: AdministradorComponent },
  { path: 'habitacion/:id', component: HabitacionDetalleComponent },
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
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),  // Aquí debes asegurarte de importar RouterModule con tus rutas
    HttpClientModule,
    EditarHabitacionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
