import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaestroHomeComponent } from './maestro-home/maestro-home.component';
import { MaestroCursoComponent } from './maestro-curso/maestro-curso.component';
import { CursoConfigComponent } from './curso-config/curso-config.component';
import { ConfigUnidadComponent } from './config-unidad/config-unidad.component';
import { ConfigSubtemaComponent } from './config-subtema/config-subtema.component';
import { ConfigClaseComponent } from './config-clase/config-clase.component';
import { ConfigTemarioComponent } from './config-temario/config-temario.component';
import { RedirecComponent } from './redirec/redirec.component';
import { MaestroAlumnosComponent } from './maestro-alumnos/maestro-alumnos.component';
import { MaestroRevisionComponent } from './maestro-revision/maestro-revision.component';
import { MaestroInsigniasComponent } from './maestro-insignias/maestro-insignias.component';
import { MaestroNuevaInsigniaComponent } from './maestro-nueva-insignia/maestro-nueva-insignia.component';
import { MaestroInsigniaEditarComponent } from './maestro-insignia-editar/maestro-insignia-editar.component';
const routes: Routes = [
  {
    path: '',
    component: MaestroHomeComponent
  },
  {
    path: 'curso/:id',
    component: MaestroCursoComponent
  },
  {
    path: 'curso/config/:id',
    component: CursoConfigComponent
  },
  {
    path: 'curso/config/:id/temario',
    component: ConfigTemarioComponent
  },
  {
    path: 'curso/config/:id/temario/:unidad',
    component: ConfigUnidadComponent
  },
  {
    path: 'curso/config/:id/temario/:unidad:/:subtema',
    component: ConfigSubtemaComponent
  },
  {
    path: 'curso/config/:id/temario/:unidad/:subtema/:clase',
    component: ConfigClaseComponent
  },
  {
    path: 'curso/:id/alumnos',
    component: MaestroAlumnosComponent
  },
  {
    path: 'curso/:id/revisar/:alumno',
    component: MaestroRevisionComponent
  },
  {
    path: 'curso/:id/insignias',
    component: MaestroInsigniasComponent
  },
  {
    path: 'curso/:id/insignias/nueva',
    component: MaestroNuevaInsigniaComponent
  },
  {
    path: 'curso/:id/insignias/editar/:insignia',
    component: MaestroInsigniaEditarComponent
  },
  {
    path: 'curso/config/:id/redirec/:ruta',
    component: RedirecComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaestroContRoutingModule { }
