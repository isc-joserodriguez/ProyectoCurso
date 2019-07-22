import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NavAlumnoComponent } from './navs/nav-alumno/nav-alumno.component';
import { NavMaestroComponent } from './navs/nav-maestro/nav-maestro.component';
import { NavAdministradorComponent } from './navs/nav-administrador/nav-administrador.component';


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
  /*
  {
    path: 'maestro',
    component: NavMaestroComponent,
    children: [
      {
        path: '',
        loadChildren: './modulos/maestro/maestro-home/maestro-home.module#MaestroHomeModule'
      }
    ]
  },
  {
    path: 'admin',
    component: NavAdministradorComponent,
    children: [
      {
        path: '',
        loadChildren: './modulos/admin/admin-home/admin-home.module#AdminHomeModule'
      }
    ]
  },
  */
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
