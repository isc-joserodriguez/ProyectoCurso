import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminHomeRoutingModule } from './admin-home-routing.module';
import { AdminHomeComponent } from './admin-home.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

@NgModule({
  declarations: [AdminHomeComponent, UsuariosComponent],
  imports: [
    CommonModule,
    AdminHomeRoutingModule
  ]
})
export class AdminHomeModule { }
