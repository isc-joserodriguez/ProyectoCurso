import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilNavRoutingModule } from './perfil-nav-routing.module';
import { PerfilNavComponent } from './perfil-nav.component';

@NgModule({
  declarations: [PerfilNavComponent],
  imports: [
    CommonModule,
    PerfilNavRoutingModule
  ]
})
export class PerfilNavModule { }
