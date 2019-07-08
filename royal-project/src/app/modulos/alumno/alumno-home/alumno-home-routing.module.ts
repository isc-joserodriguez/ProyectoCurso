import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlumnoHomeComponent } from './alumno-home.component';
import { PerfilComponent } from './perfil/perfil.component';
import { CarritoComponent } from './carrito/carrito.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { MisCursosComponent } from './mis-cursos/mis-cursos.component';

const routes: Routes = [
  {
    path: '',
    component: AlumnoHomeComponent
  },
  {
    path: 'mi-perfil',
    component: PerfilComponent
  },
  {
    path: 'mi-carrito',
    component: CarritoComponent
  },
  {
    path: 'buscar',
    component: BusquedaComponent
  },
  {
    path: 'mis-cursos',
    component: MisCursosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlumnoHomeRoutingModule { }
