import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CursosService } from '../../../../servicios/cursos.service';
import { FirebaseService } from '../../../../servicios/firebase.service';
declare let videojs: any;

@Component({
  selector: 'app-config-clase',
  templateUrl: './config-clase.component.html',
  styleUrls: ['./config-clase.component.scss']
})
export class ConfigClaseComponent implements OnInit, OnDestroy {
  respuesta: any = {
    code: 0,
    msg: '',
    detail: ''
  };
  numPlantilla = 0;

  infoClase: any = {};

  temario = [];
  listaRecursos = [];
  objTarea: any = {};

  portada = '';
  nombreClase = '';
  unidad = this.route.snapshot.params.unidad;
  subtema = this.route.snapshot.params.subtema;
  clase = this.route.snapshot.params.clase;

  viejoVideo = ''
  finalizadoVideo = true;
  cambiaVideo = false;
  mensajeVideo = 'No hay video';
  datosFormularioVideo = new FormData();
  nombreVideo = '';
  URLVideo = '';
  porcentajeVideo = 0;

  viejoRecurso = ''
  finalizadoRecurso = true;
  cambiaRecurso = false;
  mensajeRecurso = 'No hay video';
  datosFormularioRecurso = new FormData();
  nombreRecurso = '';
  URLRecurso = '';
  porcentajeRecurso = 0;

  videoForm: FormGroup;
  textoForm: FormGroup;
  recursosForm: FormGroup;
  tareaForm: FormGroup;
  recursos = false;
  tarea = false;
  mostrarFormRecurso = false;
  mostrarFormTarea = false;

  editado = 0;
  editar = false;

  constructor(private firebase: FirebaseService, private route: ActivatedRoute, private router: Router, private cursos: CursosService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.videoForm = this.formBuilder.group({
      video: [''],
      texto: ['', Validators.required]
    });
    this.textoForm = this.formBuilder.group({
      texto: ['', Validators.required]
    });
    this.recursosForm = this.formBuilder.group({
      urlRecurso: [''],
      textoRecurso: ['', Validators.required]
    });
    this.tareaForm = this.formBuilder.group({
      instruccion: ['', Validators.required]
    });
    this.infoCurso(this.route.snapshot.params.id)

  }

  ngOnDestroy(): void {
    if (this.numPlantilla == 0) {
      var oldPlayer = document.getElementById('videoId');
      videojs(oldPlayer).dispose();
    }
  }

  infoCurso(id) {
    this.cursos.getCursoInfo(id).subscribe(res => {
      this.respuesta = res;
      this.temario = this.respuesta.detail[0].contenidoCurso;
      this.portada = this.respuesta.detail[0].imagen;
      this.infoClase = this.temario[this.unidad - 1].subtemas[this.subtema - 1].clases[this.clase - 1];
      this.nombreClase = this.infoClase.clase;
      this.numPlantilla = this.infoClase.tipoPlantilla;
      //Agregar video
      videojs("videoId", {
        sources: [{
          src: this.infoClase.video,
          type: 'video/mp4'
        }]
      }, function () {
        // Player (this) is initialized and ready.
      });

      this.videoForm.setValue({
        video: '',
        texto: this.infoClase.texto
      });

      this.textoForm.setValue({
        texto: this.infoClase.texto
      });

      if (this.infoClase.recursos.activo) {
        this.recursos = true;
        this.getRecursos()
      }
      if (this.infoClase.tarea.activo) {
        this.tarea = true;
        this.getTarea()
      }
    });
  }

  public seleccionarVideo(event) {
    this.cambiaVideo = true;
    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.mensajeVideo = `${event.target.files[i].name}`.substring(0, 9);
        this.nombreVideo = event.target.files[i].name;
        this.datosFormularioVideo.delete('archivo');
        this.datosFormularioVideo.append('archivo', event.target.files[i], event.target.files[i].name);
      }
    } else {
      this.mensajeVideo = 'No hay video';
    }
  }

  public seleccionarRecurso(event) {
    this.cambiaRecurso = true;
    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.mensajeRecurso = `${event.target.files[i].name}`.substring(0, 9);
        this.nombreRecurso = event.target.files[i].name;
        this.datosFormularioRecurso.delete('archivo');
        this.datosFormularioRecurso.append('archivo', event.target.files[i], event.target.files[i].name);
      }
    } else {
      this.mensajeRecurso = 'No hay video';
    }
  }

  public subirVideo() {
    if (this.cambiaVideo) {
      this.viejoVideo = this.infoClase.video;
      this.finalizadoVideo = false;
      this.porcentajeVideo = 0;
      const archivo = this.datosFormularioVideo.get('archivo');
      const referencia = this.firebase.referenciaCloudStorage('usuario/' + localStorage.getItem('userid') + '/curso/' + this.route.snapshot.params.id + '/video/' + this.unidad + '-' + this.subtema + '-' + this.clase + this.nombreVideo);
      const tarea = this.firebase.tareaCloudStorage('usuario/' + localStorage.getItem('userid') + '/curso/' + this.route.snapshot.params.id + '/video/' + this.unidad + '-' + this.subtema + '-' + this.clase + this.nombreVideo, archivo);
      // Cambia el porcentaje
      tarea.percentageChanges().subscribe((porcentaje) => {
        this.porcentajeVideo = Math.round(porcentaje);
        if (this.porcentajeVideo == 100) {
          var currentTime = new Date().getTime();
          while (currentTime + 1000 >= new Date().getTime()) {
          }
          referencia.getDownloadURL().subscribe((URL) => {
            this.infoClase.video = URL;
            this.infoClase.texto = this.videoForm.value.texto;
            this.infoClase.tipoPlantilla = 0;
            this.temario[this.unidad - 1].subtemas[this.subtema - 1].clases[this.clase - 1] = this.infoClase;
            this.cursos.updateTemario(this.route.snapshot.params.id, { contenidoCurso: this.temario }).subscribe(res => {
              this.finalizadoVideo = true;
              this.cambiaVideo = false;
              if (!this.viejoVideo.includes('vjs.zencdn.net/v/oceans.mp4')) {
                this.viejoVideo = this.viejoVideo.split('video%2F')[1];
                this.viejoVideo = this.viejoVideo.split('?')[0];
                if (!this.viejoVideo.includes(this.nombreVideo)) {
                  const referenciaBorrar = this.firebase.referenciaCloudStorage('usuario/' +
                    localStorage.getItem('userid') + '/curso/' + this.route.snapshot.params.id + '/video/' + this.unidad + '-' + this.subtema + '-' + this.clase + this.viejoVideo);
                  referenciaBorrar.delete().subscribe(() => {
                    this.router.navigate(['/maestro/curso/config/', this.route.snapshot.params.id, 'redirec', this.unidad + '-' + this.subtema + '-' + this.clase]);
                  });
                } else {
                  this.router.navigate(['/maestro/curso/config/', this.route.snapshot.params.id, 'redirec', this.unidad + '-' + this.subtema + '-' + this.clase]);
                }
              } else {
                this.router.navigate(['/maestro/curso/config/', this.route.snapshot.params.id, 'redirec', this.unidad + '-' + this.subtema + '-' + this.clase]);
              }
            });
          });
        }
      });
    } else {
      this.infoClase.texto = this.videoForm.value.texto;
      this.infoClase.tipoPlantilla = 0;
      this.temario[this.unidad - 1].subtemas[this.subtema - 1].clases[this.clase - 1] = this.infoClase;
      this.cursos.updateTemario(this.route.snapshot.params.id, { contenidoCurso: this.temario }).subscribe(res => {
        this.finalizadoVideo = true;
        this.cambiaVideo = false;
        this.router.navigate(['/maestro/curso/config/', this.route.snapshot.params.id, 'redirec', this.unidad + '-' + this.subtema + '-' + this.clase]);
      });
    }
  }

  subirTexto() {
    this.infoClase.texto = this.textoForm.value.texto;
    this.infoClase.tipoPlantilla = 1;
    this.temario[this.unidad - 1].subtemas[this.subtema - 1].clases[this.clase - 1] = this.infoClase;
    this.cursos.updateTemario(this.route.snapshot.params.id, { contenidoCurso: this.temario }).subscribe(res => {
      this.videoForm.setValue({
        video: '',
        texto: this.textoForm.value.texto
      })
      //this.router.navigate(['/maestro/curso/config/', this.route.snapshot.params.id, 'redirec', this.unidad + '-' + this.subtema + '-' + this.clase]);
    });
  }

  getRecursos() {
    this.cursos.getCursoInfo(this.route.snapshot.params.id).subscribe(res => {
      this.respuesta = res;
      this.temario = this.respuesta.detail[0].contenidoCurso;
      this.infoClase = this.temario[this.unidad - 1].subtemas[this.subtema - 1].clases[this.clase - 1];
      this.listaRecursos = this.infoClase.recursos.urls;
    });
  }

  getTarea() {
    this.cursos.getCursoInfo(this.route.snapshot.params.id).subscribe(res => {
      this.respuesta = res;
      this.temario = this.respuesta.detail[0].contenidoCurso;
      this.infoClase = this.temario[this.unidad - 1].subtemas[this.subtema - 1].clases[this.clase - 1];
      this.objTarea = this.infoClase.tarea;
      this.tareaForm.setValue({
        instruccion: this.objTarea.instruccion
      })
    });
  }

  subirRecurso() {
    if (this.cambiaRecurso) {
      if (this.editar) {
        this.viejoRecurso = this.listaRecursos[this.editado].urlRecurso;
      }
      this.finalizadoRecurso = false;
      this.porcentajeRecurso = 0;
      const archivo = this.datosFormularioRecurso.get('archivo');
      const referencia = this.firebase.referenciaCloudStorage('usuario/' + localStorage.getItem('userid') + '/curso/' + this.route.snapshot.params.id + '/recursos/' + this.nombreRecurso);
      const tarea = this.firebase.tareaCloudStorage('usuario/' + localStorage.getItem('userid') + '/curso/' + this.route.snapshot.params.id + '/recursos/' + this.nombreRecurso, archivo);
      // Cambia el porcentaje
      tarea.percentageChanges().subscribe((porcentaje) => {
        this.porcentajeRecurso = Math.round(porcentaje);
        if (this.porcentajeRecurso == 100) {
          var currentTime = new Date().getTime();
          while (currentTime + 1000 >= new Date().getTime()) {
          }
          referencia.getDownloadURL().subscribe((URL) => {
            if (this.editar) {
              this.listaRecursos[this.editado] = {
                urlRecurso: URL,
                textoRecurso: this.recursosForm.value.textoRecurso
              }
              this.infoClase.recursos = {
                activo: true,
                urls: this.listaRecursos
              };
            } else {
              this.listaRecursos.push({
                urlRecurso: URL,
                textoRecurso: this.recursosForm.value.textoRecurso
              });
              this.infoClase.recursos = {
                activo: true,
                urls: this.listaRecursos
              };
            }
            this.temario[this.unidad - 1].subtemas[this.subtema - 1].clases[this.clase - 1] = this.infoClase;
            this.cursos.updateTemario(this.route.snapshot.params.id, { contenidoCurso: this.temario }).subscribe(res => {
              this.finalizadoRecurso = true;
              this.cambiaRecurso = false;
              if (this.editar) {
                this.viejoRecurso = this.viejoRecurso.split('recursos%2F')[1];
                this.viejoRecurso = this.viejoRecurso.split('?')[0];
                if (!this.viejoRecurso.includes(this.nombreRecurso)) {
                  const referenciaBorrar = this.firebase.referenciaCloudStorage('usuario/' +
                    localStorage.getItem('userid') + '/curso/' + this.route.snapshot.params.id + '/recursos/' + this.viejoRecurso);
                  referenciaBorrar.delete();
                };
              }
              this.getRecursos();
              this.editar = false;
              this.mostrarFormRecurso = false;
            });
          });
        }
      });
    } else {
      this.listaRecursos[this.editado].textoRecurso = this.recursosForm.value.textoRecurso;
      this.infoClase.recursos = {
        activo: true,
        urls: this.listaRecursos
      };
      this.editar = false;
      this.temario[this.unidad - 1].subtemas[this.subtema - 1].clases[this.clase - 1] = this.infoClase;
      this.cursos.updateTemario(this.route.snapshot.params.id, { contenidoCurso: this.temario }).subscribe(res => {
        this.finalizadoRecurso = true;
        this.cambiaRecurso = false;
        this.mostrarFormRecurso = false;
        this.getRecursos();
      });
    }
  }

  editarRecurso(i) {
    this.mostrarFormRecurso = true;
    this.recursosForm.setValue({
      urlRecurso: '',
      textoRecurso: this.listaRecursos[i].textoRecurso
    });
    this.editado = i;
    this.editar = true
  }

  subirTarea() {
    this.infoClase.tarea = {
      activo: true,
      instruccion: this.tareaForm.value.instruccion
    };
    this.temario[this.unidad - 1].subtemas[this.subtema - 1].clases[this.clase - 1] = this.infoClase;
    this.cursos.updateTemario(this.route.snapshot.params.id, { contenidoCurso: this.temario }).subscribe(res => {
      this.router.navigate(['/maestro/curso/config/', this.route.snapshot.params.id, 'redirec', this.unidad + '-' + this.subtema + '-' + this.clase]);
    });
  }

  addRecurso() {
    this.mostrarFormRecurso = true;
    this.editar = false;
    this.recursosForm.setValue({
      urlRecurso: '',
      textoRecurso: ''
    });
  }

  recargarVideo() {
    this.router.navigate(['/maestro/curso/config/', this.route.snapshot.params.id, 'redirec', this.unidad + '-' + this.subtema + '-' + this.clase]);
  }
}
