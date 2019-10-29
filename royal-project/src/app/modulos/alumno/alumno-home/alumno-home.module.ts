import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlumnoHomeRoutingModule } from './alumno-home-routing.module';
import { AlumnoHomeComponent } from './alumno-home.component';
import { CarritoComponent } from './carrito/carrito.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { MisCursosComponent } from './mis-cursos/mis-cursos.component';
import { PerfilNavComponent } from './perfil-nav/perfil-nav.component';
import { ComunidadComponent } from './comunidad/comunidad.component';
import { ComunidadNuevoComponent } from './comunidad-nuevo/comunidad-nuevo.component';
import { ComunidadPreguntaComponent } from './comunidad-pregunta/comunidad-pregunta.component';
import { ComunidadPropiasComponent } from './comunidad-propias/comunidad-propias.component';
import { CursoResumenComponent } from './curso-resumen/curso-resumen.component';
import { CursoClaseComponent } from './curso-clase/curso-clase.component';



// Forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Material
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';


// mdbootstrap
import { CarouselModule } from 'angular-bootstrap-md';
import { CursoComponent } from './curso/curso.component';
import { CategoriasComponent } from './categorias/categorias.component';


//rating star
import { BarRatingModule } from "ngx-bar-rating";

//pagination
import { NgxPaginationModule } from 'ngx-pagination';
import { PerfilPublicoComponent } from './perfil-publico/perfil-publico.component';
import { CursoClaseInfoComponent } from './curso-clase-info/curso-clase-info.component';


//safe pipe
import { SafePipeModule } from 'safe-pipe';


//editor ckeditor
import { CKEditorModule } from 'ng2-ckeditor';

import {NgDompurifyModule} from '@tinkoff/ng-dompurify';

@NgModule({
  declarations: [AlumnoHomeComponent, CarritoComponent, BusquedaComponent, MisCursosComponent,
    PerfilNavComponent, CursoComponent, CategoriasComponent, ComunidadComponent, ComunidadNuevoComponent, ComunidadPreguntaComponent, ComunidadPropiasComponent, CursoResumenComponent, CursoClaseComponent, PerfilPublicoComponent, CursoClaseInfoComponent],
  imports: [
    CommonModule,
    AlumnoHomeRoutingModule,
    MatTabsModule,
    MatButtonModule,
    CarouselModule,
    MatDividerModule,
    MatExpansionModule,
    MatIconModule,
    MatCheckboxModule,
    BarRatingModule,
    NgxPaginationModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    CKEditorModule,
    SafePipeModule,
    NgDompurifyModule
  ]
})
export class AlumnoHomeModule { }
