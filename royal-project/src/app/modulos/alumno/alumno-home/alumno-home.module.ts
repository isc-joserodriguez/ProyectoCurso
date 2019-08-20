import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlumnoHomeRoutingModule } from './alumno-home-routing.module';
import { AlumnoHomeComponent } from './alumno-home.component';
import { CarritoComponent } from './carrito/carrito.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { MisCursosComponent } from './mis-cursos/mis-cursos.component';
import { PerfilNavComponent } from './perfil-nav/perfil-nav.component';

// Material
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';


// mdbootstrap
import { CarouselModule } from 'angular-bootstrap-md';


@NgModule({
  declarations: [AlumnoHomeComponent, CarritoComponent, BusquedaComponent, MisCursosComponent,PerfilNavComponent],
  imports: [
    CommonModule,
    AlumnoHomeRoutingModule,
    MatTabsModule,
    MatButtonModule,
    CarouselModule
  ]
})
export class AlumnoHomeModule { }
