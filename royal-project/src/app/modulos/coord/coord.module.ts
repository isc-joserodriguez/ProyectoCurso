import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoordRoutingModule } from './coord-routing.module';
import { CoordComponent } from './coord.component';

@NgModule({
  declarations: [CoordComponent],
  imports: [
    CommonModule,
    CoordRoutingModule
  ]
})
export class CoordModule { }
