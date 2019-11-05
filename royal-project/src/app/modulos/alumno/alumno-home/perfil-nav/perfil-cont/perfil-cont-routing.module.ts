import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerfilComponent } from './perfil/perfil.component';
import { CuentaComponent } from './cuenta/cuenta.component';
import { HistorialComprasComponent } from './historial-compras/historial-compras.component';
import { CertificadosComponent } from './certificados/certificados.component';

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
    path: 'historial',
    component: HistorialComprasComponent
  },
  {
    path: 'certificados',
    component: CertificadosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilContRoutingModule { }
