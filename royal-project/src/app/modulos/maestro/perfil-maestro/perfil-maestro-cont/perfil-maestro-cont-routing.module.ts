import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerfilComponent } from './perfil/perfil.component';
import { CuentaComponent } from './cuenta/cuenta.component';
import { DocumentacionComponent } from './documentacion/documentacion.component';
import { HistorialPagosComponent } from './historial-pagos/historial-pagos.component';

const routes: Routes = [
  {
    path: '',
    component: PerfilComponent
  },
  {
    path: 'cuenta',
    component: CuentaComponent
  },
  {
    path: 'documentacion',
    component: DocumentacionComponent
  },
  {
    path: 'pagos',
    component: HistorialPagosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilMaestroContRoutingModule { }
