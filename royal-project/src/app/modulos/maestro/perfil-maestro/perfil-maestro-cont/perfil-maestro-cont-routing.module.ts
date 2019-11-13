import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerfilComponent } from './perfil/perfil.component';
import { CuentaComponent } from './cuenta/cuenta.component';
import { DocumentacionComponent } from './documentacion/documentacion.component';
import { EstatusCursosComponent } from './estatus-cursos/estatus-cursos.component';

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
    path: 'estado-cursos',
    component: EstatusCursosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilMaestroContRoutingModule { }
