import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoordContRoutingModule } from './coord-cont-routing.module';
import { CoordHomeComponent } from './coord-home/coord-home.component';

@NgModule({
  declarations: [CoordHomeComponent],
  imports: [
    CommonModule,
    CoordContRoutingModule
  ]
})
export class CoordContModule { }
