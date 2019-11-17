import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { DomSanitizer } from '@angular/platform-browser';
import { DiarioService } from 'src/app/servicios/diario.service';

@Component({
  selector: 'app-diario-entrada',
  templateUrl: './diario-entrada.component.html',
  styleUrls: ['./diario-entrada.component.scss']
})
export class DiarioEntradaComponent implements OnInit {
  //pagination
  p: number = 1;
  //ckeditor
  name = 'ng2-ckeditor';
  ckeConfig: any;
  mycontent: string;
  log: string = '';
  @ViewChild("myckeditor") ckeditor: any;
  //fin ckeditor

  iduser = localStorage.getItem('userid');
  propia = false
  numPreguntas = 0;
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

  infoEntrada: any = {
    categoria: '',
    escrito: '',
    fecha: '',
    idPersona: 0,
    titulo: '',
    respuestas: [],
    ruta: ''
  }

  respuestaForm: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, private usuarios: UsuariosService, private diario: DiarioService, private formBuilder: FormBuilder, @Inject(DomSanitizer) private readonly sanitizer: DomSanitizer) { }

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

    this.respuestaForm = this.formBuilder.group({
      respuesta: ['', Validators.required]
    });

    this.getPregunta(this.route.snapshot.params.ruta);

  }

  getPregunta(ruta) {
    this.diario.getEntrada(ruta).subscribe((res: any) => {
      this.infoEntrada = res.detail[0];
      this.numPreguntas = this.infoEntrada.respuestas.length;
      if (this.infoEntrada.idPersona == this.iduser) {
        this.propia = true;
      }
      this.getinfoPersona(this.infoEntrada.idPersona);
      this.infoRespuestas = [];
      this.infoEntrada.respuestas.forEach((respuesta, i) => {
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
                maestro: (usuarioCom.detail[0].tipo[2].maestro == null) ? false : true,
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
            maestro: (usuario.detail[0].tipo[2].maestro == null) ? false : true,
            i: i
          }
          if (!respuesta.reportado) this.infoRespuestas.push(nuevaRes);
        });
      });
    });
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

  enviarRespuesta() {
    this.infoEntrada.respuestas.push({
      idPersona: localStorage.getItem('userid'),
      comentario: this.respuestaForm.value.respuesta
    });

    this.diario.agregarRespuesta(this.route.snapshot.params.ruta, { respuestas: this.infoEntrada.respuestas }).subscribe(res => {
      this.getPregunta(this.route.snapshot.params.ruta);
      this.respuestaForm.setValue({
        respuesta: ' '
      });
    });
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
    this.infoEntrada.respuestas[i].respuestas.push({
      idPersona: localStorage.getItem('userid'),
      comentario: this.respuestaCom
    });

    this.diario.agregarRespuesta(this.route.snapshot.params.ruta, { respuestas: this.infoEntrada.respuestas }).subscribe(res => {
      this.getPregunta(this.route.snapshot.params.ruta);
      this.respuestaCom = '';
      this.responderIndex = -1;
    });
  }
  reportarComentarioN1(i) {
    this.infoEntrada.respuestas[i].reportado = true;
    this.infoEntrada.reportes.push({
      tipo: 1,
      respn1: i,
      idReporta: localStorage.getItem('userid')
    });
    this.diario.agregarReporte(this.route.snapshot.params.ruta, { respuestas: this.infoEntrada.respuestas, reportado: false, reportes: this.infoEntrada.reportes }).subscribe(res => {
      this.getPregunta(this.route.snapshot.params.ruta);
      this.respuestaCom = '';
      this.responderIndex = -1;
    });
  }

  reportarComentarioN2(i, j) {
    this.infoEntrada.respuestas[i].respuestas[j].reportado = true;
    this.infoEntrada.reportes.push({
      tipo: 2,
      respn1: i,
      respn2: j,
      idReporta: localStorage.getItem('userid')
    });
    this.diario.agregarReporte(this.route.snapshot.params.ruta, { respuestas: this.infoEntrada.respuestas, reportado: false, reportes: this.infoEntrada.reportes }).subscribe(res => {
      this.getPregunta(this.route.snapshot.params.ruta);
      this.respuestaCom = '';
      this.responderIndex = -1;
    });
  }

  reportarEntrada() {
    this.infoEntrada.reportes.push({
      tipo: 0,
      idReporta: localStorage.getItem('userid')
    });
    this.diario.agregarReporte(this.route.snapshot.params.ruta, { respuestas: this.infoEntrada.respuestas, reportado: true, reportes: this.infoEntrada.reportes }).subscribe(res => {
      this.router.navigate(['/diario/entradas']);
    });
  }
}
