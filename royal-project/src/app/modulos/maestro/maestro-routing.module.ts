import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaestroComponent } from './maestro.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaestroRoutingModule { }
