import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NavAlumnoComponent } from './navs/nav-alumno/nav-alumno.component';
import { NavMaestroComponent } from './navs/nav-maestro/nav-maestro.component';
import { NavAdministradorComponent } from './navs/nav-administrador/nav-administrador.component';
import { NavCoordinadorComponent } from './navs/nav-coordinador/nav-coordinador.component';


const routes: Routes = [
  {
    path: '',
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
    component: NavMaestroComponent,
    children: [
      {
        path: '',
        loadChildren: './modulos/maestro/maestro.module#MaestroModule'
      }
    ]
  },
  {
    path: 'admin',
    component: NavAdministradorComponent,
    children: [
      {
        path: '',
        loadChildren: './modulos/admin/admin.module#AdminModule'
      }
    ]
  },
  {
    path: 'coord',
    component: NavCoordinadorComponent,
    children: [
      {
        path: '',
        loadChildren: './modulos/coord/coord.module#CoordModule'
      }
    ]
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
