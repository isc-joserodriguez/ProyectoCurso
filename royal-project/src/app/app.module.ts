import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavAlumnoComponent } from './navs/nav-alumno/nav-alumno.component';
import { NavMaestroComponent } from './navs/nav-maestro/nav-maestro.component';
import { NavCoordinadorComponent } from './navs/nav-coordinador/nav-coordinador.component';
import { NavAdministradorComponent } from './navs/nav-administrador/nav-administrador.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


// Componentes del MDB
import { NavbarModule, WavesModule, ButtonsModule, CarouselModule } from 'angular-bootstrap-md';


// Angular Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';

// Environment
import { environment } from '../environments/environment';

//scroll infinito
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    AppComponent,
    NavAlumnoComponent,
    NavMaestroComponent,
    NavCoordinadorComponent,
    NavAdministradorComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AppRoutingModule,
    NavbarModule,
    WavesModule,
    ButtonsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    CarouselModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSelectModule,
    MatMenuModule,
    MatDividerModule,
    InfiniteScrollModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
