import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoordComponent } from './coord.component';

const routes: Routes = [
  {
    path: '',
    component: CoordComponent,
    children: [
      {
        path: '',
        loadChildren: './coord-cont/coord-cont.module#CoordContModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoordRoutingModule { }
