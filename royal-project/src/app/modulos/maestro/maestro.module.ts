import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaestroRoutingModule } from './maestro-routing.module';
import { MaestroComponent } from './maestro.component';

// MDBootstrap
import { CarouselModule } from 'angular-bootstrap-md';
import { CardsFreeModule  } from 'angular-bootstrap-md';

@NgModule({
  declarations: [MaestroComponent],
  imports: [
    CommonModule,
    MaestroRoutingModule,
    CarouselModule,
    CardsFreeModule
  ]
})
export class MaestroModule { }
