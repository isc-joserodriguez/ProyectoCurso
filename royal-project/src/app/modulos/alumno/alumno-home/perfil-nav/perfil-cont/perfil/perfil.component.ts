import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { FirebaseService } from 'src/app/servicios/firebase.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  respuesta: any = {
    code: 0,
    msg: '',
    detail: ''
  };
  viejaFoto = '';
  cambiaFoto = false;

  public mensajeArchivo = 'No hay un archivo seleccionado';
  public datosFormulario = new FormData();
  public nombreArchivo = '';
  public URLPublica = '';
  public porcentaje = 0;
  public finalizado = true;

  perfilForm: FormGroup;

  constructor(private firebase: FirebaseService, private usuario: UsuariosService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.perfilForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apPaterno: ['', Validators.required],
      apMaterno: ['', Validators.required],
      sexo: ['', Validators.required],
      fechaNac: ['', Validators.required],
      web: [''],
      fb: [''],
      yt: [''],
      in: [''],
      cv: ['', Validators.required],
      foto: new FormControl(null, Validators.required)
    });

    this.getUser(localStorage.getItem('userid'));
  }
  getUser(id) {
    this.usuario.getUser(id).subscribe(user => {
      this.respuesta = user;
      this.URLPublica = this.respuesta.detail[0].foto;

      this.perfilForm.setValue({
        nombre: this.respuesta.detail[0].nombre,
        apPaterno: this.respuesta.detail[0].apPaterno,
        apMaterno: this.respuesta.detail[0].apMaterno,
        sexo: this.respuesta.detail[0].sexo,
        fechaNac: this.respuesta.detail[0].fechaNac,
        web: this.respuesta.detail[0].web,
        fb: this.respuesta.detail[0].fb,
        yt: this.respuesta.detail[0].yt,
        in: this.respuesta.detail[0].in,
        cv: this.respuesta.detail[0].resumen,
        foto: ''
      });
    });
  }
  guardar() {
    const datos = {
      nombre: this.perfilForm.value.nombre,
      apPaterno: this.perfilForm.value.apPaterno,
      apMaterno: this.perfilForm.value.apMaterno,
      sexo: this.perfilForm.value.sexo,
      fechaNac: this.perfilForm.value.fechaNac,
      foto: this.URLPublica,
      web: this.perfilForm.value.web,
      fb: this.perfilForm.value.fb,
      yt: this.perfilForm.value.yt,
      in: this.perfilForm.value.in,
      resumen: this.perfilForm.value.cv
    };
    if (this.cambiaFoto) {
      this.subirArchivo(datos);
    } else {
      this.usuario.updateDatos(localStorage.getItem('userid'), datos).subscribe(res => {
        this.finalizado = true;
      });
    }
  }
  public seleccionarFoto(event) {
    this.cambiaFoto = true;
    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.mensajeArchivo = `Archivo preparado: ${event.target.files[i].name}`;
        this.nombreArchivo = event.target.files[i].name;
        this.datosFormulario.delete('archivo');
        this.datosFormulario.append('archivo', event.target.files[i], event.target.files[i].name);
      }
    } else {
      this.mensajeArchivo = 'No hay un archivo seleccionado';
    }
  }
  // Sube el archivo a Cloud Storage
  public subirArchivo(datos) {
    this.finalizado = false;
    this.porcentaje = 0;
    const archivo = this.datosFormulario.get('archivo');
    const referencia = this.firebase.referenciaCloudStorage('usuario/' +
      localStorage.getItem('userid') + '/foto-perfil/' + this.nombreArchivo);
    const tarea = this.firebase.tareaCloudStorage('usuario/' +
      localStorage.getItem('userid') + '/foto-perfil/' + this.nombreArchivo, archivo);
    // Cambia el porcentaje
    tarea.percentageChanges().subscribe((porcentaje) => {
      this.porcentaje = Math.round(porcentaje);
      if (this.porcentaje == 100) {
        var currentTime = new Date().getTime();
        while (currentTime + 1000 >= new Date().getTime()) {
        }
        referencia.getDownloadURL().subscribe((URL) => {
          if (!this.URLPublica.includes('www.lorempixel.com')) {
            this.viejaFoto = this.URLPublica.split('foto-perfil%2F')[1];
            this.viejaFoto = this.viejaFoto.split('?')[0];
            const referenciaBorrar = this.firebase.referenciaCloudStorage('usuario/' +
              localStorage.getItem('userid') + '/foto-perfil/' + this.viejaFoto);
            referenciaBorrar.delete();
          }
          this.URLPublica = URL;
          datos.foto = URL;
          this.usuario.updateDatos(localStorage.getItem('userid'), datos).subscribe(res => {
            this.finalizado = true;
            this.cambiaFoto = false;
          });
        });
      }
    });
  }
}
