import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavAlumnoComponent } from './navs/nav-alumno/nav-alumno.component';
import { NavMaestroComponent } from './navs/nav-maestro/nav-maestro.component';
import { NavCoordinadorComponent } from './navs/nav-coordinador/nav-coordinador.component';
import { NavAdministradorComponent } from './navs/nav-administrador/nav-administrador.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegisterComponent } from './componentes/register/register.component';

//componentes del MDB
import { NavbarModule, WavesModule, ButtonsModule } from 'angular-bootstrap-md'

//Angular Material
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    NavAlumnoComponent,
    NavMaestroComponent,
    NavCoordinadorComponent,
    NavAdministradorComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavbarModule,
    WavesModule, 
    ButtonsModule,
    BrowserAnimationsModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
