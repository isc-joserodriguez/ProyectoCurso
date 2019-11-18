import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';

import { NavAlumnoComponent } from './navs/nav-alumno/nav-alumno.component';
import { NavMaestroComponent } from './navs/nav-maestro/nav-maestro.component';
import { NavAdministradorComponent } from './navs/nav-administrador/nav-administrador.component';
import { UsuarioDesactivadoComponent } from './modulos/usuario-desactivado/usuario-desactivado.component';


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
    path: 'usuario-inhabilitado',
    component: UsuarioDesactivadoComponent
  },
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
  }
];
const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 64],
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
