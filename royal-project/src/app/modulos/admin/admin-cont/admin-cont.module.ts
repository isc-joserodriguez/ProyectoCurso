import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminContRoutingModule } from './admin-cont-routing.module';
import { AdminHomeComponent } from './admin-home/admin-home.component';

// Forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';

// MDBootstrap
import { CarouselModule } from 'angular-bootstrap-md';
import { CardsFreeModule } from 'angular-bootstrap-md';
import { WavesModule, IconsModule, ButtonsModule } from 'angular-bootstrap-md';

// Components
import { AdminCursosComponent } from './admin-cursos/admin-cursos.component';
import { AdminUsuariosComponent } from './admin-usuarios/admin-usuarios.component';
import { AdminPagosComponent } from './admin-pagos/admin-pagos.component';
import { AdminUsuarioNuevoComponent } from './admin-usuario-nuevo/admin-usuario-nuevo.component';
import { AdminUsuarioInfoComponent } from './admin-usuario-info/admin-usuario-info.component';
import { CursoRevisionComponent } from './curso-revision/curso-revision.component';
import { AdminInscripcionComponent } from './admin-inscripcion/admin-inscripcion.component';
import { AdminReportesComponent } from './admin-reportes/admin-reportes.component';


@NgModule({
  declarations: [
    AdminHomeComponent,
    AdminCursosComponent,
    AdminUsuariosComponent,
    AdminPagosComponent,
    AdminUsuarioNuevoComponent,
    AdminUsuarioInfoComponent,
    CursoRevisionComponent,
    AdminInscripcionComponent,
    AdminReportesComponent
  ],
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
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    WavesModule,
    IconsModule,
    ButtonsModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatDividerModule,
    MatAutocompleteModule,
    MatCheckboxModule
  ]
})
export class AdminContModule { }
