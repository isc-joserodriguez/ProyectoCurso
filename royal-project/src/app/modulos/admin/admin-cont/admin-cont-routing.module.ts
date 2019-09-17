import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminPagosComponent } from './admin-pagos/admin-pagos.component';
import { AdminUsuariosComponent } from './admin-usuarios/admin-usuarios.component';
import { AdminEstadisticasComponent } from './admin-estadisticas/admin-estadisticas.component';
import { AdminCursosComponent } from './admin-cursos/admin-cursos.component';
import { AdminUsuarioNuevoComponent } from './admin-usuario-nuevo/admin-usuario-nuevo.component';
import { AdminUsuarioInfoComponent } from './admin-usuario-info/admin-usuario-info.component';
import { CursoRevisionComponent } from './curso-revision/curso-revision.component';

const routes: Routes = [
  {
    path: '',
    component: AdminHomeComponent
  },
  {
    path: 'cursos',
    component: AdminCursosComponent
  },
  {
    path: 'usuarios',
    component: AdminUsuariosComponent
  },
  {
    path: 'pagos',
    component: AdminPagosComponent
  },
  {
    path: 'estadisticas',
    component: AdminEstadisticasComponent
  },
  {
    path: 'nuevo-usuario',
    component: AdminUsuarioNuevoComponent
  },
  {
    path: 'usuario/:id',
    component: AdminUsuarioInfoComponent
  },
  {
    path: 'cursos/revisar/:id',
    component: CursoRevisionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminContRoutingModule { }
