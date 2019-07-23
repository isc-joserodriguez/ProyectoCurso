import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminContRoutingModule } from './admin-cont-routing.module';
import { AdminHomeComponent } from './admin-home/admin-home.component';

//material
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule } from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {TextFieldModule} from '@angular/cdk/text-field';
import {MatSelectModule} from '@angular/material/select';
// MDBootstrap
import { CarouselModule } from 'angular-bootstrap-md';
import { CardsFreeModule  } from 'angular-bootstrap-md';
import { AdminCursosComponent } from './admin-cursos/admin-cursos.component';
import { AdminUsuariosComponent } from './admin-usuarios/admin-usuarios.component';
import { AdminPagosComponent } from './admin-pagos/admin-pagos.component';
import { AdminEstadisticasComponent } from './admin-estadisticas/admin-estadisticas.component';
import { AdminUsuarioNuevoComponent } from './admin-usuario-nuevo/admin-usuario-nuevo.component';

@NgModule({
  declarations: [AdminHomeComponent, AdminCursosComponent, AdminUsuariosComponent, AdminPagosComponent, AdminEstadisticasComponent, AdminUsuarioNuevoComponent],
  imports: [
    CommonModule,
    AdminContRoutingModule,
    CarouselModule,
    CardsFreeModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDatepickerModule,
    TextFieldModule,
    MatSelectModule
  ]
})
export class AdminContModule { }
