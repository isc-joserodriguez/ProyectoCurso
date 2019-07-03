import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlumnoHomeRoutingModule } from './alumno-home-routing.module';
import { AlumnoHomeComponent } from './alumno-home.component';

import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
  declarations: [AlumnoHomeComponent],
  imports: [
    CommonModule,
    AlumnoHomeRoutingModule,
    MatTabsModule
  ]
})
export class AlumnoHomeModule { }
