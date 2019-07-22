import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminContRoutingModule } from './admin-cont-routing.module';
import { AdminHomeComponent } from './admin-home/admin-home.component';

// MDBootstrap
import { CarouselModule } from 'angular-bootstrap-md';
import { CardsFreeModule  } from 'angular-bootstrap-md';
import { AdminCursosComponent } from './admin-cursos/admin-cursos.component';
import { AdminUsuariosComponent } from './admin-usuarios/admin-usuarios.component';
import { AdminPagosComponent } from './admin-pagos/admin-pagos.component';
import { AdminEstadisticasComponent } from './admin-estadisticas/admin-estadisticas.component';

@NgModule({
  declarations: [AdminHomeComponent, AdminCursosComponent, AdminUsuariosComponent, AdminPagosComponent, AdminEstadisticasComponent],
  imports: [
    CommonModule,
    AdminContRoutingModule,
    CarouselModule,
    CardsFreeModule
  ]
})
export class AdminContModule { }
