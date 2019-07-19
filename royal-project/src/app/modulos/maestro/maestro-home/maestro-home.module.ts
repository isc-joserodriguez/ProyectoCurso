import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaestroHomeRoutingModule } from './maestro-home-routing.module';
import { MaestroHomeComponent } from './maestro-home.component';

//MDBootstrap
import { CarouselModule } from 'angular-bootstrap-md';

import { CardsFreeModule  } from 'angular-bootstrap-md';


@NgModule({
  declarations: [MaestroHomeComponent],
  imports: [
    CommonModule,
    MaestroHomeRoutingModule,
    CarouselModule,
    CardsFreeModule
  ]
})
export class MaestroHomeModule { }
