import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlumnoHomeRoutingModule } from './alumno-home-routing.module';
import { AlumnoHomeComponent } from './alumno-home.component';

import {MatTabsModule} from '@angular/material/tabs';
import { PerfilComponent } from './perfil/perfil.component';
import { CarritoComponent } from './carrito/carrito.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { MisCursosComponent } from './mis-cursos/mis-cursos.component';

@NgModule({
  declarations: [AlumnoHomeComponent, PerfilComponent, CarritoComponent, BusquedaComponent, MisCursosComponent],
  imports: [
    CommonModule,
    AlumnoHomeRoutingModule,
    MatTabsModule
  ]
})
export class AlumnoHomeModule { }
