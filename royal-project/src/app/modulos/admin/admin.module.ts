import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';

// MDBootstrap
import { CarouselModule } from 'angular-bootstrap-md';
import { CardsFreeModule  } from 'angular-bootstrap-md';

//Material
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    CarouselModule,
    CardsFreeModule,
    MatExpansionModule
  ]
})
export class AdminModule { }
