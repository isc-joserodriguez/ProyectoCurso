import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilNavRoutingModule } from './perfil-nav-routing.module';
import { PerfilNavComponent } from './perfil-nav.component';

import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [PerfilNavComponent],
  imports: [
    CommonModule,
    PerfilNavRoutingModule,
    MatProgressBarModule
  ]
})
export class PerfilNavModule { }
