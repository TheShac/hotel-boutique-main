import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { CatalogoHabitacionesComponent } from './catalogo-habitaciones/catalogo-habitaciones.component';
import { CarritoComprasComponent } from './carrito-compras/carrito-compras.component';
import { AdministradorComponent } from './administrador/administrador.component';
import { AuthGuard } from './auth.guard'; 

import { RegisterComponent } from './register/register.component';
import { HabitacionDetalleComponent } from './habitacion-detalle/habitacion-detalle.component';
import { HomeComponent } from './home/home.component';
import { GestionarServiciosComponent } from './gestionar-servicios/gestionar-servicios.component';

const routes: Routes = [
  // Vistas que pueden entrar cualquier usuario
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'catalogo', component: CatalogoHabitacionesComponent },
  { path: 'habitacion/:id', component: HabitacionDetalleComponent },

  // Vistas que pueden entrar solo los clientes 
  { path: 'perfil', component: PerfilUsuarioComponent, /*canActivate: [AuthGuard], data: { expectedRoles: ['client','emps','admin']} */},
  { path: 'carrito', component: CarritoComprasComponent, canActivate: [AuthGuard], data: { expectedRoles: ['client','emps','admin']} },

  // Vistas que pueden entrar solo los rol: admin
  { path: 'admin', component: AdministradorComponent, canActivate: [AuthGuard], data: { expectedRoles: 'admin'} },
  { path: 'gestionServicios', component: GestionarServiciosComponent, canActivate: [AuthGuard], data: { expectedRoles: 'admin'} },
  
];

@NgModule({
  
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
