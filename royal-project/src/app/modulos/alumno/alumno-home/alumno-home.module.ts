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
import { PerfilPublicoComponent } from './perfil-publico/perfil-publico.component';



// Forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Material
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';


// mdbootstrap
import { CarouselModule } from 'angular-bootstrap-md';
import { CursoComponent } from './curso/curso.component';
import { CategoriasComponent } from './categorias/categorias.component';


//rating star
import { BarRatingModule } from "ngx-bar-rating";

//pagination
import { NgxPaginationModule } from 'ngx-pagination';

//safe pipe
import { SafePipeModule } from 'safe-pipe';

//editor ckeditor
import { CKEditorModule } from 'ng2-ckeditor';

import { NgDompurifyModule } from '@tinkoff/ng-dompurify';
import { PerfilMaestroComponent } from './perfil-maestro/perfil-maestro.component';
import { SubcategoriaComponent } from './subcategoria/subcategoria.component';
import { DiarioComponent } from './diario/diario.component';
import { DiarioNuevoComponent } from './diario-nuevo/diario-nuevo.component';
import { DiarioEntradaComponent } from './diario-entrada/diario-entrada.component';
import { DiarioPropiasComponent } from './diario-propias/diario-propias.component';

@NgModule({
  declarations: [AlumnoHomeComponent, CarritoComponent, BusquedaComponent, MisCursosComponent,
    PerfilNavComponent, CursoComponent, CategoriasComponent, ComunidadComponent, ComunidadNuevoComponent, ComunidadPreguntaComponent, ComunidadPropiasComponent, CursoResumenComponent, CursoClaseComponent, PerfilPublicoComponent, PerfilMaestroComponent, SubcategoriaComponent, DiarioComponent, DiarioNuevoComponent, DiarioEntradaComponent, DiarioPropiasComponent],
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
    NgDompurifyModule,
    MatSelectModule,
    MatTableModule,
    MatCardModule
  ]
})
export class AlumnoHomeModule { }
