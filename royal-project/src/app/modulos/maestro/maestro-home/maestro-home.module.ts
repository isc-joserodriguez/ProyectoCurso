import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaestroHomeRoutingModule } from './maestro-home-routing.module';
import { MaestroHomeComponent } from './maestro-home.component';

@NgModule({
  declarations: [MaestroHomeComponent],
  imports: [
    CommonModule,
    MaestroHomeRoutingModule
  ]
})
export class MaestroHomeModule { }
