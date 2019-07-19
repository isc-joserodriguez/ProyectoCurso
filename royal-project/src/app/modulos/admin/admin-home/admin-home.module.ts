import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminHomeRoutingModule } from './admin-home-routing.module';
import { AdminHomeComponent } from './admin-home.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

//MDBootstrap
import { CarouselModule } from 'angular-bootstrap-md';

import { CardsFreeModule  } from 'angular-bootstrap-md';

@NgModule({
  declarations: [AdminHomeComponent, UsuariosComponent],
  imports: [
    CommonModule,
    AdminHomeRoutingModule,
    CarouselModule,
    CardsFreeModule
  ]
})
export class AdminHomeModule { }
