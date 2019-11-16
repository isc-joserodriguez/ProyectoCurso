import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaestroContRoutingModule } from './maestro-cont-routing.module';
import { MaestroHomeComponent } from './maestro-home/maestro-home.component';

// Forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//material
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatAutocompleteModule } from '@angular/material/autocomplete';


// MDBootstrap
import { CarouselModule } from 'angular-bootstrap-md';
import { CardsFreeModule } from 'angular-bootstrap-md';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

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

//rating star
import { BarRatingModule } from "ngx-bar-rating";

//editor ckeditor
import { CKEditorModule } from 'ng2-ckeditor';

import { NgxPaginationModule } from 'ngx-pagination';
import { DiarioComponent } from './diario/diario.component';
import { DiarioEntradaComponent } from './diario-entrada/diario-entrada.component';

@NgModule({
  declarations: [MaestroHomeComponent, CursoConfigComponent, ConfigUnidadComponent, ConfigSubtemaComponent, ConfigClaseComponent, ConfigTemarioComponent, RedirecComponent, MaestroAlumnosComponent, MaestroRevisionComponent, MaestroInsigniasComponent, MaestroNuevaInsigniaComponent, MaestroInsigniaEditarComponent, DiarioComponent, DiarioEntradaComponent],
  imports: [
    CommonModule,
    MaestroContRoutingModule,
    CarouselModule,
    CardsFreeModule,
    MatTableModule,
    MatDividerModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatIconModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatPaginatorModule,
    MatAutocompleteModule,
    CKEditorModule,
    NgxPaginationModule,
    BarRatingModule
  ]
})
export class MaestroContModule { }
