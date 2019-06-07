import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavAlumnoComponent } from './navs/nav-alumno/nav-alumno.component';
import { NavMaestroComponent } from './navs/nav-maestro/nav-maestro.component';
import { NavCoordinadorComponent } from './navs/nav-coordinador/nav-coordinador.component';
import { NavAdministradorComponent } from './navs/nav-administrador/nav-administrador.component';

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
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
