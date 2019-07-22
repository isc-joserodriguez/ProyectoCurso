import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaestroHomeComponent } from './maestro-home/maestro-home.component';
import { MaestroCursoComponent } from './maestro-curso/maestro-curso.component';

const routes: Routes = [
  {
    path: '',
    component: MaestroHomeComponent
  },
  {
    path: 'curso/:id',
    component: MaestroCursoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaestroContRoutingModule { }
