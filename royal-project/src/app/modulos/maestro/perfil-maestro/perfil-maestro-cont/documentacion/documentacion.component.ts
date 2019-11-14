import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { FirebaseService } from 'src/app/servicios/firebase.service';

@Component({
  selector: 'app-documentacion',
  templateUrl: './documentacion.component.html',
  styleUrls: ['./documentacion.component.scss']
})
export class DocumentacionComponent implements OnInit {
  //CV
  cv = false;
  public msjCv = 'No hay un archivo seleccionado';
  public nombreCv = '';
  public datosCv = new FormData();
  public porcentajeCv = 0;
  public finalizadoCv = true;

  //ID
  id = false;
  public msjId = 'No hay un archivo seleccionado';
  public nombreId = '';
  public datosId = new FormData();
  public porcentajeId = 0;
  public finalizadoId = true;

  //Cert
  cert = false;
  public msjCert = 'No hay un archivo seleccionado';
  public nombreCert = '';
  public datosCert = new FormData();
  public porcentajeCert = 0;
  public finalizadoCert = true;


  docs: any = {};
  nombre = '';

  constructor(private usuarios: UsuariosService, private firebase: FirebaseService) { }

  ngOnInit() {
    this.getInfoUsuario(localStorage.getItem('userid'));
  }
  getInfoUsuario(id) {
    this.cv = false;
    this.id = false;
    this.cert = false;
    this.nombre = '';
    this.usuarios.getUser(id).subscribe((info: any) => {
      this.docs = info.detail[0].documentos;
    });
  }

  public seleccionarCv(event) {
    this.cv = true;
    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.msjCv = event.target.files[i].name;
        this.nombreCv = event.target.files[i].name;
        this.datosCv.delete('archivo');
        this.datosCv.append('archivo', event.target.files[i], event.target.files[i].name);
      }
    } else {
      this.msjCv = 'No hay un archivo seleccionado';
    }
  }

  public subirCv() {
    this.finalizadoCv = false;
    this.porcentajeCv = 0;
    const archivo = this.datosCv.get('archivo');
    const referencia = this.firebase.referenciaCloudStorage('usuario/' + localStorage.getItem('userid') + '/docs/' + this.nombreCv);
    const tarea = this.firebase.tareaCloudStorage('usuario/' + localStorage.getItem('userid') + '/docs/' + this.nombreCv, archivo);
    // Cambia el porcentaje
    tarea.percentageChanges().subscribe((porcentaje) => {
      this.porcentajeCv = Math.round(porcentaje);
      if (this.porcentajeCv == 100) {
        var currentTime = new Date().getTime();
        while (currentTime + 1000 >= new Date().getTime()) {
        }
        referencia.getDownloadURL().subscribe((URL) => {
          this.docs.curriculum = URL;
          this.usuarios.updateDocs(localStorage.getItem('userid'), { documentos: this.docs }).subscribe(res => {
            this.finalizadoCv = true;
            this.getInfoUsuario(localStorage.getItem('userid'));
          });
        });
      }
    });
  }

  public eliminarCv() {
    delete this.docs.curriculum;
    this.usuarios.updateDocs(localStorage.getItem('userid'), { documentos: this.docs }).subscribe(res => {
      this.finalizadoCv = true;
      this.getInfoUsuario(localStorage.getItem('userid'));
    });
  }

  public seleccionarId(event) {
    this.id = true;
    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.msjId = event.target.files[i].name;
        this.nombreId = event.target.files[i].name;
        this.datosId.delete('archivo');
        this.datosId.append('archivo', event.target.files[i], event.target.files[i].name);
      }
    } else {
      this.msjId = 'No hay un archivo seleccionado';
    }
  }

  public subirId() {
    this.finalizadoId = false;
    this.porcentajeId = 0;
    const archivo = this.datosId.get('archivo');
    const referencia = this.firebase.referenciaCloudStorage('usuario/' + localStorage.getItem('userid') + '/docs/' + this.nombreId);
    const tarea = this.firebase.tareaCloudStorage('usuario/' + localStorage.getItem('userid') + '/docs/' + this.nombreId, archivo);
    // Cambia el porcentaje
    tarea.percentageChanges().subscribe((porcentaje) => {
      this.porcentajeId = Math.round(porcentaje);
      if (this.porcentajeId == 100) {
        var currentTime = new Date().getTime();
        while (currentTime + 1000 >= new Date().getTime()) {
        }
        referencia.getDownloadURL().subscribe((URL) => {
          this.docs.identificacion = URL;
          this.usuarios.updateDocs(localStorage.getItem('userid'), { documentos: this.docs }).subscribe(res => {
            this.finalizadoId = true;
            this.getInfoUsuario(localStorage.getItem('userid'));
          });
        });
      }
    });
  }

  public eliminarId() {
    delete this.docs.identificacion;
    this.usuarios.updateDocs(localStorage.getItem('userid'), { documentos: this.docs }).subscribe(res => {
      this.finalizadoCv = true;
      this.getInfoUsuario(localStorage.getItem('userid'));
    });
  }

  public seleccionarCert(event) {
    this.cert = true;
    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.msjCert = event.target.files[i].name;
        this.nombreCert = event.target.files[i].name;
        this.datosCert.delete('archivo');
        this.datosCert.append('archivo', event.target.files[i], event.target.files[i].name);
      }
    } else {
      this.msjCert = 'No hay un archivo seleccionado';
    }
  }

  public subirCert() {
    this.finalizadoCert = false;
    this.porcentajeCert = 0;
    const archivo = this.datosCert.get('archivo');
    const referencia = this.firebase.referenciaCloudStorage('usuario/' + localStorage.getItem('userid') + '/docs/' + this.nombreCert);
    const tarea = this.firebase.tareaCloudStorage('usuario/' + localStorage.getItem('userid') + '/docs/' + this.nombreCert, archivo);
    // Cambia el porcentaje
    tarea.percentageChanges().subscribe((porcentaje) => {
      this.porcentajeCert = Math.round(porcentaje);
      if (this.porcentajeCert == 100) {
        var currentTime = new Date().getTime();
        while (currentTime + 1000 >= new Date().getTime()) {
        }
        referencia.getDownloadURL().subscribe((URL) => {
          this.docs.certificados.push({
            nombre: this.nombre,
            url: URL
          });
          this.usuarios.updateDocs(localStorage.getItem('userid'), { documentos: this.docs }).subscribe(res => {
            this.finalizadoCert = true;
            this.getInfoUsuario(localStorage.getItem('userid'));
          });
        });
      }
    });
  }

  public eliminarCert(index) {
    this.docs.certificados.splice(index, 1)
    this.usuarios.updateDocs(localStorage.getItem('userid'), { documentos: this.docs }).subscribe(res => {
      this.finalizadoCert = true;
      this.getInfoUsuario(localStorage.getItem('userid'));
    });
  }
}


