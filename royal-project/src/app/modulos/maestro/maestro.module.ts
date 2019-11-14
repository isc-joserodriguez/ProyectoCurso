import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaestroRoutingModule } from './maestro-routing.module';
import { MaestroComponent } from './maestro.component';
import { MaestroNuevoCursoComponent } from './maestro-nuevo-curso/maestro-nuevo-curso.component';
import { PerfilMaestroComponent } from './perfil-maestro/perfil-maestro.component';
import { PerfilPublicoComponent } from './perfil-publico/perfil-publico.component';
import { PerfilAlumnoComponent } from './perfil-alumno/perfil-alumno.component';

// Forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// MDBootstrap
import { CarouselModule } from 'angular-bootstrap-md';
import { CardsFreeModule } from 'angular-bootstrap-md';

// Material
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';

//safe pipe
import { SafePipeModule } from 'safe-pipe';

@NgModule({
  declarations: [MaestroComponent, MaestroNuevoCursoComponent, PerfilMaestroComponent, PerfilPublicoComponent, PerfilAlumnoComponent],
  imports: [
    CommonModule,
    MaestroRoutingModule,
    CarouselModule,
    CardsFreeModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatDividerModule,
    SafePipeModule,
    MatTabsModule
  ]
})
export class MaestroModule { }
