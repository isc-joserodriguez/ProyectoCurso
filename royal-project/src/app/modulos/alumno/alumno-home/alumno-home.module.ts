import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlumnoHomeRoutingModule } from './alumno-home-routing.module';
import { AlumnoHomeComponent } from './alumno-home.component';

@NgModule({
  declarations: [AlumnoHomeComponent],
  imports: [
    CommonModule,
    AlumnoHomeRoutingModule
  ]
})
export class AlumnoHomeModule { }
