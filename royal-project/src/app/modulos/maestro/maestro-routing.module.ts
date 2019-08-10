import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaestroComponent } from './maestro.component';
import { MaestroNuevoCursoComponent } from './maestro-nuevo-curso/maestro-nuevo-curso.component';

const routes: Routes = [
  {
    path: '',
    component: MaestroComponent,
    children: [
      {
        path: '',
        loadChildren: './maestro-cont/maestro-cont.module#MaestroContModule'
      }
    ]
  },
  {
    path:'curso-nuevo',
    component: MaestroNuevoCursoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaestroRoutingModule { }
