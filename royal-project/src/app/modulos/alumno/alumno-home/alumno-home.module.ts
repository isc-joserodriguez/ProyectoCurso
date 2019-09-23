import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlumnoHomeRoutingModule } from './alumno-home-routing.module';
import { AlumnoHomeComponent } from './alumno-home.component';
import { CarritoComponent } from './carrito/carrito.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { MisCursosComponent } from './mis-cursos/mis-cursos.component';
import { PerfilNavComponent } from './perfil-nav/perfil-nav.component';

// Material
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';



// mdbootstrap
import { CarouselModule } from 'angular-bootstrap-md';
import { CursoComponent } from './curso/curso.component';
import { CategoriasComponent } from './categorias/categorias.component';



@NgModule({
  declarations: [AlumnoHomeComponent, CarritoComponent, BusquedaComponent, MisCursosComponent,
    PerfilNavComponent, CursoComponent, CategoriasComponent],
  imports: [
    CommonModule,
    AlumnoHomeRoutingModule,
    MatTabsModule,
    MatButtonModule,
    CarouselModule,
    MatDividerModule,
    MatExpansionModule,
    MatIconModule
  ]
})
export class AlumnoHomeModule { }
