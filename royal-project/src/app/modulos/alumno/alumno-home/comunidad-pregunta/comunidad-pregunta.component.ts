import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComunidadService } from 'src/app/servicios/comunidad.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-comunidad-pregunta',
  templateUrl: './comunidad-pregunta.component.html',
  styleUrls: ['./comunidad-pregunta.component.scss']
})

export class ComunidadPreguntaComponent implements OnInit {
  //pagination
  p: number = 1;
  //ckeditor
  name = 'ng2-ckeditor';
  ckeConfig: any;
  mycontent: string;
  log: string = '';
  //fin ckeditor

  iduser = localStorage.getItem('userid');
  propia = false
  respuestaCom = '';
  responderIndex = -1;

  infoPersona = {
    foto: '',
    nombreCompleto: '',
    resumen: '',
    id: 0,
    ruta: ''
  };

  infoRespuestas = [];

  infoPregunta: any = {
    actualizaciones: [],
    categoria: '',
    detalles: '',
    fecha: '',
    idPersona: 0,
    pregunta: '',
    respuestas: [],
    ruta: '',
    reportes: []
  }

  editarCategoria = false;
  editarPregunta = false;

  respuestaForm: FormGroup;
  preguntaForm: FormGroup;
  actualizacionForm: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, private usuarios: UsuariosService, private comunidad: ComunidadService, private formBuilder: FormBuilder, @Inject(DomSanitizer) private readonly sanitizer: DomSanitizer) { }

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

    this.preguntaForm = this.formBuilder.group({
      pregunta: ['', Validators.required]
    });

    this.actualizacionForm = this.formBuilder.group({
      actualizacion: ['', Validators.required]
    });

    this.respuestaForm = this.formBuilder.group({
      respuesta: ['', Validators.required]
    });

    this.getPregunta(this.route.snapshot.params.ruta);

  }

  getPregunta(ruta) {
    this.comunidad.getPregunta(ruta).subscribe((res: any) => {
      this.infoPregunta = res.detail[0];
      if (this.infoPregunta.categoria == 'tecnologia') {
        this.infoPregunta.categoria = 'Tecnología'
      } else {
        this.infoPregunta.categoria = 'Idiomas'
      }
      if (this.infoPregunta.idPersona == this.iduser) {
        this.propia = true;
      }
      this.getinfoPersona(this.infoPregunta.idPersona);
      this.infoRespuestas = [];
      this.infoPregunta.respuestas.forEach((respuesta, i) => {
        this.usuarios.getUser(respuesta.idPersona).subscribe((usuario: any) => {
          var respuestas = [];
          respuesta.respuestas.forEach((respuestaCom, j) => {
            this.usuarios.getUser(respuestaCom.idPersona).subscribe((usuarioCom: any) => {
              let resCom: any = {
                nombreCompleto: usuarioCom.detail[0].nombre + ' ' + usuarioCom.detail[0].apPaterno + ' ' + usuarioCom.detail[0].apMaterno,
                comentario: respuestaCom.comentario,
                fecha: respuestaCom.fecha,
                foto: usuarioCom.detail[0].foto,
                id: respuestaCom.idPersona,
                ruta: usuarioCom.detail[0].ruta,
                i: i,
                j: j
              }
              if (!respuestaCom.reportado) respuestas.push(resCom);
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
            i: i
          }
          if (!respuesta.reportado) this.infoRespuestas.push(nuevaRes);
        });
      });
    });
    if (localStorage.getItem('pregunta') != null) {
      this.preguntaForm.setValue({
        pregunta: localStorage.getItem('pregunta')
      });
    }
  }

  getinfoPersona(id) {
    this.usuarios.getUser(id).subscribe((usuario: any) => {
      this.infoPersona.id = usuario.detail[0]._id;
      this.infoPersona.foto = usuario.detail[0].foto;
      this.infoPersona.nombreCompleto = usuario.detail[0].nombre + ' ' + usuario.detail[0].apPaterno + ' ' + usuario.detail[0].apMaterno;
      this.infoPersona.resumen = usuario.detail[0].resumen;
      this.infoPersona.ruta = usuario.detail[0].ruta;
    });
  }

  hacerPregunta() {
    localStorage.setItem('pregunta', this.preguntaForm.value.pregunta);
    this.router.navigate(['/comunidad/nueva', this.infoPregunta.categoria]);
  }

  cambiarCategoria() {
    this.comunidad.cambiarCategoria(this.route.snapshot.params.ruta, { categoria: this.infoPregunta.categoria }).subscribe(res => {
      this.getPregunta(this.route.snapshot.params.ruta);
      this.editarCategoria = false;
    });
  }

  agregarActualizacion() {
    this.infoPregunta.actualizaciones.push({ actualizacion: this.actualizacionForm.value.actualizacion });
    this.comunidad.agregarActualizacion(this.route.snapshot.params.ruta, { actualizaciones: this.infoPregunta.actualizaciones }).subscribe(res => {
      this.getPregunta(this.route.snapshot.params.ruta);
      this.editarPregunta = false;
      this.actualizacionForm = this.formBuilder.group({
        actualizacion: ['', Validators.required]
      });
    });
  }

  enviarRespuesta() {
    this.infoPregunta.respuestas.push({
      idPersona: localStorage.getItem('userid'),
      comentario: this.respuestaForm.value.respuesta
    });

    this.comunidad.agregarRespuesta(this.route.snapshot.params.ruta, { respuestas: this.infoPregunta.respuestas }).subscribe(res => {
      if (parseInt(localStorage.getItem('userid')) != this.infoPregunta.idPersona) {
        //Notificar
        this.usuarios.getUser(this.infoPregunta.idPersona).subscribe((user: any) => {
          user.detail[0].notificaciones.push({
            ruta: '/comunidad/pregunta/' + this.infoPregunta.ruta,
            descripcion: 'Tu pregunta recibió un comentario.'
          });
          this.usuarios.updateNotificaciones(this.infoPregunta.idPersona, { notificaciones: user.detail[0].notificaciones }).subscribe(res => { });
        });
        //
      }



      this.usuarios.getUser(localStorage.getItem('userid')).subscribe((info: any) => {
        info.detail[0].puntaje = info.detail[0].puntaje + 5;
        this.usuarios.updatePuntaje(localStorage.getItem('userid'), { puntaje: info.detail[0].puntaje }).subscribe(res => { });
      });
      this.getPregunta(this.route.snapshot.params.ruta);
      this.respuestaForm.setValue({
        respuesta: ' '
      });
    });
  }

  navegarCat() {
    if (this.infoPregunta.categoria == 'Tecnología') {
      this.router.navigate(['/comunidad/tecnologia']);
    } else {
      this.router.navigate(['/comunidad/idiomas']);
    }
  }

  setDetalles(detalles) {
    this.respuestaForm.setValue({
      respuesta: detalles
    });
  }

  responder(index) {
    this.responderIndex = index;
    this.respuestaCom = '';
  }
  enviarRespuestaCom(i) {
    this.infoPregunta.respuestas[i].respuestas.push({
      idPersona: localStorage.getItem('userid'),
      comentario: this.respuestaCom
    });

    this.comunidad.agregarRespuesta(this.route.snapshot.params.ruta, { respuestas: this.infoPregunta.respuestas }).subscribe(res => {
      var notificados = [parseInt(localStorage.getItem('userid')), this.infoPregunta.idPersona];
      if (!notificados.includes(this.infoPregunta.respuestas[i].idPersona)) notificados.push(this.infoPregunta.respuestas[i].idPersona);
      this.infoPregunta.respuestas[i].respuestas.forEach(respuesta => {
        if (!notificados.includes(respuesta.idPersona)) notificados.push(respuesta.idPersona);
      });
      notificados.splice(0, 1);
      notificados.forEach(id => {
        //Notificar
        this.usuarios.getUser(id).subscribe((user: any) => {
          var desc = '';
          if (id == this.infoPregunta.idPersona) {
            desc = 'Tu pregunta recibió una respuesta de comentario.';
          } else if (id == this.infoPregunta.respuestas[i].idPersona) {
            desc = 'Recibiste una respuesta en tu comentario.';
          } else {
            desc = 'Alguien más respondió un comentario.';
          }
          user.detail[0].notificaciones.push({
            ruta: '/comunidad/pregunta/' + this.infoPregunta.ruta,
            descripcion: desc
          });
          this.usuarios.updateNotificaciones(id, { notificaciones: user.detail[0].notificaciones }).subscribe(res => {
            this.usuarios.getUser(localStorage.getItem('userid')).subscribe((info: any) => {
              info.detail[0].puntaje = info.detail[0].puntaje + 5;
              this.usuarios.updatePuntaje(localStorage.getItem('userid'), { puntaje: info.detail[0].puntaje }).subscribe(res => { });
            });
          });
        });
        //
      });



      this.getPregunta(this.route.snapshot.params.ruta);
      this.respuestaCom = '';
      this.responderIndex = -1;
    });
  }

  reportarComentarioN1(i) {
    this.infoPregunta.respuestas[i].reportado = true;
    this.infoPregunta.reportes.push({
      tipo: 1,
      respn1: i,
      idReporta: localStorage.getItem('userid')
    });
    this.comunidad.agregarReporte(this.route.snapshot.params.ruta, { respuestas: this.infoPregunta.respuestas, reportado: false, reportes: this.infoPregunta.reportes }).subscribe(res => {
      this.getPregunta(this.route.snapshot.params.ruta);
      this.respuestaCom = '';
      this.responderIndex = -1;
    });
  }

  reportarComentarioN2(i, j) {
    this.infoPregunta.respuestas[i].respuestas[j].reportado = true;
    this.infoPregunta.reportes.push({
      tipo: 2,
      respn1: i,
      respn2: j,
      idReporta: localStorage.getItem('userid')
    });
    this.comunidad.agregarReporte(this.route.snapshot.params.ruta, { respuestas: this.infoPregunta.respuestas, reportado: false, reportes: this.infoPregunta.reportes }).subscribe(res => {
      this.getPregunta(this.route.snapshot.params.ruta);
      this.respuestaCom = '';
      this.responderIndex = -1;
    });
  }

  reportarEntrada() {
    this.infoPregunta.reportes.push({
      tipo: 0,
      idReporta: localStorage.getItem('userid')
    });
    this.comunidad.agregarReporte(this.route.snapshot.params.ruta, { respuestas: this.infoPregunta.respuestas, reportado: true, reportes: this.infoPregunta.reportes }).subscribe(res => {
      if (this.infoPregunta.categoria == 'Tecnología') {
        this.router.navigate(['/comunidad/tecnologia']);
      } else {
        this.router.navigate(['/comunidad/idiomas']);
      }
    });
  }

}
