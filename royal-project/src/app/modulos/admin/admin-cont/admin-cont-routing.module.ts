import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminPagosComponent } from './admin-pagos/admin-pagos.component';
import { AdminUsuariosComponent } from './admin-usuarios/admin-usuarios.component';
import { AdminCursosComponent } from './admin-cursos/admin-cursos.component';
import { AdminUsuarioNuevoComponent } from './admin-usuario-nuevo/admin-usuario-nuevo.component';
import { AdminUsuarioInfoComponent } from './admin-usuario-info/admin-usuario-info.component';
import { CursoRevisionComponent } from './curso-revision/curso-revision.component';
import { AdminInscripcionComponent } from './admin-inscripcion/admin-inscripcion.component';
import { AdminReportesComponent } from './admin-reportes/admin-reportes.component';
import { AdminPromosComponent } from './admin-promos/admin-promos.component';
import { AdminPromosNuevaComponent } from './admin-promos-nueva/admin-promos-nueva.component';
import { AdminPromosEditComponent } from './admin-promos-edit/admin-promos-edit.component';
import { AdminPerfilComponent } from './admin-perfil/admin-perfil.component';
import { AdminCuentaComponent } from './admin-cuenta/admin-cuenta.component';

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
    path: 'reportes',
    component: AdminReportesComponent
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
  },
  {
    path: 'inscripciones',
    component: AdminInscripcionComponent
  },
  {
    path: 'promos',
    component: AdminPromosComponent
  },
  {
    path: 'promos/nueva',
    component: AdminPromosNuevaComponent
  },
  {
    path: 'promos/editar/:id',
    component: AdminPromosEditComponent
  },
  {
    path: 'config/perfil',
    component: AdminPerfilComponent
  },
  {
    path: 'config/cuenta',
    component: AdminCuentaComponent
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminContRoutingModule { }
