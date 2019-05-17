import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaestrosComponent } from './maestros/maestros.component';
import { MaestroDetalleComponent } from './maestro-detalle/maestro-detalle.component';
import { MaestroNuevoComponent } from './maestro-nuevo/maestro-nuevo.component';
import { MaestroEditarComponent } from './maestro-editar/maestro-editar.component';

const routes: Routes = [
  {
    path: 'maestros',
    component: MaestrosComponent,
    data: {tittle: 'Lista de maestros'}
  },
  {
    path: 'maestro-detalle/:id',
    component: MaestroDetalleComponent,
    data: {tittle: 'Maestro detalles'}
  },
  {
    path: 'maestro-nuevo',
    component: MaestroNuevoComponent,
    data: {tittle: 'Agregar maestro'}
  },
  {
    path: 'maestro-editar/:id',
    component: MaestroEditarComponent,
    data: {tittle: 'Editar maestro'}
  },
  {
    path: '',
    redirectTo: '/maestros',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
