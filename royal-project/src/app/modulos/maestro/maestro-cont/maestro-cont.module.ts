import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaestroContRoutingModule } from './maestro-cont-routing.module';
import { MaestroHomeComponent } from './maestro-home/maestro-home.component';
import { MaestroCursoComponent } from './maestro-curso/maestro-curso.component';

// MDBootstrap
import { CarouselModule } from 'angular-bootstrap-md';
import { CardsFreeModule  } from 'angular-bootstrap-md';

@NgModule({
  declarations: [MaestroHomeComponent, MaestroCursoComponent],
  imports: [
    CommonModule,
    MaestroContRoutingModule,
    CarouselModule,
    CardsFreeModule
  ]
})
export class MaestroContModule { }
