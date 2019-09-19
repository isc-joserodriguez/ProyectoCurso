import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaestroContRoutingModule } from './maestro-cont-routing.module';
import { MaestroHomeComponent } from './maestro-home/maestro-home.component';
import { MaestroCursoComponent } from './maestro-curso/maestro-curso.component';

//material
import {MatTableModule} from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';

// MDBootstrap
import { CarouselModule } from 'angular-bootstrap-md';
import { CardsFreeModule  } from 'angular-bootstrap-md';
import { CursoConfigComponent } from './curso-config/curso-config.component';

@NgModule({
  declarations: [MaestroHomeComponent, MaestroCursoComponent, CursoConfigComponent],
  imports: [
    CommonModule,
    MaestroContRoutingModule,
    CarouselModule,
    CardsFreeModule,
    MatTableModule,
    MatDividerModule
  ]
})
export class MaestroContModule { }
