import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NavAlumnoComponent } from './navs/nav-alumno/nav-alumno.component';
import { NavMaestroComponent } from './navs/nav-maestro/nav-maestro.component';


const routes: Routes = [
  {
    path: 'inicio',
    component: NavAlumnoComponent,
    children: [
      {
        path: '',
        loadChildren: './modulos/alumno/alumno-home/alumno-home.module#AlumnoHomeModule'
      }
     ]
  },
  {
    path: 'maestro',
    component: NavMaestroComponent
  },
  {
    path: '',
    redirectTo: '/inicio',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
