import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CursosService } from 'src/app/servicios/cursos.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { FirebaseService } from 'src/app/servicios/firebase.service';
import { CKEditorComponent } from 'ng2-ckeditor/esm5/ckeditor.component.js';
declare let videojs: any;

@Component({
  selector: 'app-config-clase',
  templateUrl: './config-clase.component.html',
  styleUrls: ['./config-clase.component.scss']
})
export class ConfigClaseComponent implements OnInit, OnDestroy, AfterViewInit {
  name = 'ng2-ckeditor';
  player: any;
  ckeConfig: any;
  mycontent: string;
  log: string = '';
  @ViewChild(CKEditorComponent) ckeditor: CKEditorComponent;
  numPlantilla = 0;

  respuestaCom = '';
  responderIndex = -1;
  infoRespuestas = [];

  infoClase: any = {
    clase: '',
    tipoPlantilla: 0,
    video: '',
    texto: '',
    recursos: { activo: false, urls: [] },
    tarea: { activo: false, envios: [] },
    comentarios: [],
    evaluacion: false
  };

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
  mensajeRecurso = 'No hay recurso';
  datosFormularioRecurso = new FormData();
  nombreRecurso = '';
  URLRecurso = '';
  porcentajeRecurso = 0;

  videoForm: FormGroup;
  recursosForm: FormGroup;
  tareaForm: FormGroup;
  recursos = false;
  video = false;
  tarea = false;
  evaluacion = false;
  mostrarFormRecurso = false;
  mostrarFormTarea = false;

  editado = 0;
  editar = false;

  constructor(private usuarios: UsuariosService, private firebase: FirebaseService, private route: ActivatedRoute, private router: Router, private cursos: CursosService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.ckeConfig = {
      allowedContent: false,
      forcePasteAsPlainText: true,
      extraPlugins: ['colorbutton', 'divarea'],

      font_names: 'Arial;Times New Roman;Verdana',
      toolbarGroups: [
        { name: 'document', groups: ['mode', 'document', 'doctools'] },
        { name: 'clipboard', groups: ['clipboard', 'undo'] },
        { name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing'] },
        { name: 'forms', groups: ['forms'] },
        '/',
        { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
        { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph'] },
        { name: 'links', groups: ['links'] },
        { name: 'insert', groups: ['insert', 'Smiley,'] },
        '/',
        { name: 'styles', groups: ['styles'] },
        { name: 'colors', groups: ['colors'] },
        { name: 'tools', groups: ['tools'] },
        { name: 'others', groups: ['others'] },
        { name: 'about', groups: ['about'] }
      ],
      removeButtons: 'Source,Save,NewPage,Preview,Print,Templates,Cut,Copy,Paste,PasteText,PasteFromWord,Undo,Redo,Find,Replace,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Strike,Subscript,Superscript,CopyFormatting,RemoveFormat,Outdent,Indent,CreateDiv,Blockquote,BidiLtr,BidiRtl,Language,Unlink,Anchor,Image,Flash,Table,HorizontalRule,SpecialChar,PageBreak,Iframe,Maximize,ShowBlocks,About'


    };
    this.videoForm = this.formBuilder.group({
      video: [''],
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
    var oldPlayer = document.getElementById('videoId');
    videojs(oldPlayer).dispose();
  }
  ngAfterViewInit(): void {
    this.player = videojs("videoId");
  }

  infoCurso(id) {
    this.cursos.getCursoInfo(id).subscribe((res: any) => {
      this.temario = res.detail[0].contenidoCurso;
      this.portada = res.detail[0].imagen;
      this.infoClase = this.temario[this.unidad - 1].subtemas[this.subtema - 1].clases[this.clase - 1];
      this.infoClase.evaluacion = this.evaluacion = this.temario[this.unidad - 1].subtemas[this.subtema - 1].clases[this.clase - 1].evaluacion;
      this.nombreClase = this.infoClase.clase;
      this.numPlantilla = this.infoClase.tipoPlantilla;
      this.video = (this.numPlantilla == 0) ? true : false;
      //Agregar video
      this.player.src({ type: "video/mp4", src: this.infoClase.video });
      this.player.poster(this.portada);

      this.videoForm.setValue({
        video: '',
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
      this.infoRespuestas = [];
      this.infoClase.comentarios.forEach(respuesta => {
        this.usuarios.getUser(respuesta.idPersona).subscribe((usuario: any) => {
          var respuestas = [];
          respuesta.respuestas.forEach(respuestaCom => {
            this.usuarios.getUser(respuestaCom.idPersona).subscribe((usuarioCom: any) => {

              let resCom: any = {
                nombreCompleto: usuarioCom.detail[0].nombre + ' ' + usuarioCom.detail[0].apPaterno + ' ' + usuarioCom.detail[0].apMaterno,
                comentario: respuestaCom.comentario,
                fecha: respuestaCom.fecha,
                foto: usuarioCom.detail[0].foto,
                id: respuestaCom.idPersona,
                ruta: usuarioCom.detail[0].ruta,
                maestro: (usuarioCom.detail[0].tipo[2].maestro == null) ? false : true
              }
              respuestas.push(resCom);
            });
          });

          let nuevaRes: any = {
            nombreCompleto: usuario.detail[0].nombre + ' ' + usuario.detail[0].apPaterno + ' ' + usuario.detail[0].apMaterno,
            comentario: respuesta.comentario,
            fecha: respuesta.fecha,
            foto: usuario.detail[0].foto,
            id: respuesta.idPersona,
            ruta: usuario.detail[0].ruta,
            respuestas: respuestas,
            maestro: (usuario.detail[0].tipo[2].maestro == null) ? false : true
          }
          this.infoRespuestas.push(nuevaRes);
        });
      });
    });
  }

  public seleccionarVideo(event) {
    this.cambiaVideo = true;
    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.mensajeVideo = `${event.target.files[i].name}`;
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
        this.mensajeRecurso = `${event.target.files[i].name}`;
        this.nombreRecurso = event.target.files[i].name;
        this.datosFormularioRecurso.delete('archivo');
        this.datosFormularioRecurso.append('archivo', event.target.files[i], event.target.files[i].name);
      }
    } else {
      this.mensajeRecurso = 'No hay recurso';
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
            this.infoClase.tipoPlantilla = (this.video) ? 0 : 1;
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
      this.infoClase.tipoPlantilla = (this.video) ? 0 : 1;
      this.temario[this.unidad - 1].subtemas[this.subtema - 1].clases[this.clase - 1] = this.infoClase;
      this.cursos.updateTemario(this.route.snapshot.params.id, { contenidoCurso: this.temario }).subscribe(res => {
        this.finalizadoVideo = true;
        this.cambiaVideo = false;
        this.router.navigate(['/maestro/curso/config/', this.route.snapshot.params.id, 'redirec', this.unidad + '-' + this.subtema + '-' + this.clase]);
      });
    }
  }

  getRecursos() {
    this.cursos.getCursoInfo(this.route.snapshot.params.id).subscribe((res: any) => {
      this.temario = res.detail[0].contenidoCurso;
      this.infoClase = this.temario[this.unidad - 1].subtemas[this.subtema - 1].clases[this.clase - 1];
      this.listaRecursos = this.infoClase.recursos.urls;
    });
  }

  getTarea() {
    this.cursos.getCursoInfo(this.route.snapshot.params.id).subscribe((res: any) => {
      this.temario = res.detail[0].contenidoCurso;
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
  cambiarRecurso() {
    this.infoClase.recursos.activo = !this.infoClase.recursos.activo;
    this.temario[this.unidad - 1].subtemas[this.subtema - 1].clases[this.clase - 1] = this.infoClase;
    this.cursos.updateTemario(this.route.snapshot.params.id, { contenidoCurso: this.temario }).subscribe(res => {
      this.router.navigate(['/maestro/curso/config/', this.route.snapshot.params.id, 'redirec', this.unidad + '-' + this.subtema + '-' + this.clase]);
    });
  }
  eliminarRecurso(i) {
    this.infoClase.recursos.urls.splice(i, 1);
    this.infoClase.recursos.activo = (this.infoClase.recursos.urls.length == 0) ? false : true;
    this.cursos.updateTemario(this.route.snapshot.params.id, { contenidoCurso: this.temario }).subscribe(res => {
      this.router.navigate(['/maestro/curso/config/', this.route.snapshot.params.id, 'redirec', this.unidad + '-' + this.subtema + '-' + this.clase]);
    });
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
    this.infoClase.tarea.activo = true;
    this.infoClase.tarea.instruccion = this.tareaForm.value.instruccion;
    this.temario[this.unidad - 1].subtemas[this.subtema - 1].clases[this.clase - 1] = this.infoClase;
    this.cursos.updateTemario(this.route.snapshot.params.id, { contenidoCurso: this.temario }).subscribe(res => {
      this.router.navigate(['/maestro/curso/config/', this.route.snapshot.params.id, 'redirec', this.unidad + '-' + this.subtema + '-' + this.clase]);
    });
  }
  cambiarTarea() {
    this.infoClase.tarea.activo = !this.infoClase.tarea.activo;
    if (this.infoClase.tarea.activo == false) this.infoClase.evaluacion = false
    this.temario[this.unidad - 1].subtemas[this.subtema - 1].clases[this.clase - 1] = this.infoClase;
    this.cursos.updateTemario(this.route.snapshot.params.id, { contenidoCurso: this.temario }).subscribe(res => {
      this.infoCurso(this.route.snapshot.params.id);
    });
  }
  cambiarEvaluacion() {
    this.infoClase.evaluacion = !this.infoClase.evaluacion;
    this.infoClase.tarea.activo = this.infoClase.evaluacion;
    this.temario[this.unidad - 1].subtemas[this.subtema - 1].clases[this.clase - 1] = this.infoClase;
    this.cursos.updateTemario(this.route.snapshot.params.id, { contenidoCurso: this.temario }).subscribe(res => {
      this.infoCurso(this.route.snapshot.params.id);
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

  responder(index) {
    this.responderIndex = index;
    this.respuestaCom = '';
  }
  enviarRespuestaCom() {
    this.temario[this.unidad - 1].subtemas[this.subtema - 1].clases[this.clase - 1].comentarios[this.responderIndex].respuestas.push({
      idPersona: localStorage.getItem('userid'),
      comentario: this.respuestaCom
    });

    this.cursos.agregarComentario(this.route.snapshot.params.id, { contenidoCurso: this.temario }).subscribe(res => {
      this.infoCurso(this.route.snapshot.params.id);
      this.respuestaCom = '';
      this.responderIndex = -1;
    });
  }
}
