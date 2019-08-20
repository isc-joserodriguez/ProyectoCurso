import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilContRoutingModule } from './perfil-cont-routing.module';
import { PerfilComponent } from './perfil/perfil.component';
import { CuentaComponent } from './cuenta/cuenta.component';
import { PagosComponent } from './pagos/pagos.component';
import { HistorialComprasComponent } from './historial-compras/historial-compras.component';
import { CertificadosComponent } from './certificados/certificados.component';

// Forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';

// MDBootstrap
import { CarouselModule } from 'angular-bootstrap-md';
import { CardsFreeModule } from 'angular-bootstrap-md';
import { WavesModule, IconsModule, ButtonsModule } from 'angular-bootstrap-md';

@NgModule({
  declarations: [PerfilComponent, CuentaComponent, PagosComponent, HistorialComprasComponent, CertificadosComponent],
  imports: [
    CommonModule,
    PerfilContRoutingModule,
    CarouselModule,
    CardsFreeModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDatepickerModule,
    TextFieldModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    WavesModule,
    IconsModule,
    ButtonsModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule
  ]
})
export class PerfilContModule { }
