import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlumnoHomeComponent } from './alumno-home.component';
import { CarritoComponent } from './carrito/carrito.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { MisCursosComponent } from './mis-cursos/mis-cursos.component';
import { PerfilNavComponent } from './perfil-nav/perfil-nav.component';
import { CursoComponent } from './curso/curso.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { RedirectComponent } from './redirect/redirect.component';

const routes: Routes = [
  {
    path: '',
    component: AlumnoHomeComponent
  },
  {
    path: 'curso/:id/vista',
    component: CursoComponent
  },
  {
    path: 'perfil',
    component: PerfilNavComponent,
    children: [
      {
        path: '',
        loadChildren: './perfil-nav/perfil-cont/perfil-cont.module#PerfilContModule'
      }
    ]
  },
  {
    path: 'mi-carrito',
    component: CarritoComponent
  },
  {
    path: 'buscar/:busqueda',
    component: BusquedaComponent
  },
  {
    path: 'categoria/:categoria',
    component: CategoriasComponent
  },
  {
    path: 'mis-cursos',
    component: MisCursosComponent
  },
  {
    path: 'busqueda/:ruta',
    component: RedirectComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlumnoHomeRoutingModule { }
