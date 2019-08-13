import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaestroRoutingModule } from './maestro-routing.module';
import { MaestroComponent } from './maestro.component';

// MDBootstrap
import { CarouselModule } from 'angular-bootstrap-md';
import { CardsFreeModule  } from 'angular-bootstrap-md';
import { MaestroNuevoCursoComponent } from './maestro-nuevo-curso/maestro-nuevo-curso.component';

//Material
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material';
import {MatButtonModule} from '@angular/material/button';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [MaestroComponent, MaestroNuevoCursoComponent],
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
    ReactiveFormsModule
  ]
})
export class MaestroModule { }
