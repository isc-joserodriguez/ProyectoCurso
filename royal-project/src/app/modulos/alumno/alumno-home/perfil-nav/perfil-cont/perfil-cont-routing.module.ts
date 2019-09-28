import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerfilComponent } from './perfil/perfil.component';
import { CuentaComponent } from './cuenta/cuenta.component';
import { PagosComponent } from './pagos/pagos.component';
import { HistorialComprasComponent } from './historial-compras/historial-compras.component';
import { CertificadosComponent } from './certificados/certificados.component';
import { RedirectComponent } from './redirect/redirect.component';

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
    path: 'pagos',
    component: PagosComponent
  },
  {
    path: 'historial',
    component: HistorialComprasComponent
  },
  {
    path: 'certificados',
    component: CertificadosComponent
  },
  {
    path: ':ruta',
    component: RedirectComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilContRoutingModule { }
