import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilMaestroContRoutingModule } from './perfil-maestro-cont-routing.module';
import { CuentaComponent } from './cuenta/cuenta.component';
import { PerfilComponent } from './perfil/perfil.component';
import { DocumentacionComponent } from './documentacion/documentacion.component';
import { HistorialPagosComponent } from './historial-pagos/historial-pagos.component';

@NgModule({
  declarations: [CuentaComponent, PerfilComponent, DocumentacionComponent, HistorialPagosComponent],
  imports: [
    CommonModule,
    PerfilMaestroContRoutingModule
  ]
})
export class PerfilMaestroContModule { }
