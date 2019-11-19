import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule, ɵ_sanitizeStyle } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavAlumnoComponent } from './navs/nav-alumno/nav-alumno.component';
import { NavMaestroComponent } from './navs/nav-maestro/nav-maestro.component';
import { NavAdministradorComponent } from './navs/nav-administrador/nav-administrador.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { SafePipeModule } from 'safe-pipe';

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
import { MatBadgeModule } from '@angular/material/badge';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';

// Environment
import { environment } from 'src/environments/environment';
import { UsuarioDesactivadoComponent } from './modulos/usuario-desactivado/usuario-desactivado.component';

//scroll infinito
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

//rating star
import { BarRatingModule } from "ngx-bar-rating";

//pagination
import { NgxPaginationModule } from 'ngx-pagination';


//editor ckeditor

import { CKEditorModule } from 'ng2-ckeditor';

import { NgDompurifyDomSanitizer, NgDompurifyModule, SANITIZE_STYLE } from '@tinkoff/ng-dompurify';


@NgModule({
  declarations: [
    AppComponent,
    NavAlumnoComponent,
    NavMaestroComponent,
    NavAdministradorComponent,
    UsuarioDesactivadoComponent
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
    InfiniteScrollModule,
    BarRatingModule,
    NgxPaginationModule,
    CKEditorModule,
    NgDompurifyModule,
    SafePipeModule,
    MatBadgeModule,
    MatSnackBarModule
  ],
  providers: [{
    provide: DomSanitizer,
    useClass: NgDompurifyDomSanitizer,
  },
  {
    provide: SANITIZE_STYLE,
    useValue: ɵ_sanitizeStyle,
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
