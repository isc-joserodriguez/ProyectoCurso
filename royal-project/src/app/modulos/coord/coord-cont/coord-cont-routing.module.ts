import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoordHomeComponent } from './coord-home/coord-home.component';

const routes: Routes = [
  {
    path: '',
    component: CoordHomeComponent
  },];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoordContRoutingModule { }
