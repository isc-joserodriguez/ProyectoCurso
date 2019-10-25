import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComunidadService } from 'src/app/servicios/comunidad.service';

@Component({
  selector: 'app-comunidad-nuevo',
  templateUrl: './comunidad-nuevo.component.html',
  styleUrls: ['./comunidad-nuevo.component.scss']
})
export class ComunidadNuevoComponent implements OnInit {
  name = 'ng2-ckeditor';
  ckeConfig: any;
  mycontent: string;
  log: string = '';
  @ViewChild("myckeditor") ckeditor: any;
  categoria = this.route.snapshot.params.categoria;
  iduser = localStorage.getItem('userid');
  respuesta: any = {
    code: 0,
    msg: '',
    detail: ''
  };

  preguntaForm: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, private comunidad: ComunidadService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.ckeConfig = {
      allowedContent: false,
      forcePasteAsPlainText: true,
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
        { name: 'insert', groups: ['insert','Smiley,'] },
        '/',
        { name: 'styles', groups: ['styles'] },
        { name: 'colors', groups: ['colors'] },
        { name: 'tools', groups: ['tools'] },
        { name: 'others', groups: ['others'] },
        { name: 'about', groups: ['about'] }
      ],
      removeButtons: 'Source,Save,NewPage,Preview,Print,Templates,Cut,Copy,Paste,PasteText,PasteFromWord,Undo,Redo,Find,Replace,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Strike,Subscript,Superscript,CopyFormatting,RemoveFormat,Outdent,Indent,CreateDiv,Blockquote,BidiLtr,BidiRtl,Language,Unlink,Anchor,Image,Flash,Table,HorizontalRule,SpecialChar,PageBreak,Iframe,Maximize,ShowBlocks,About'
    };
    if (this.iduser == null) {
      this.router.navigate(['/']);
    }
    this.preguntaForm = this.formBuilder.group({
      pregunta: ['', Validators.required],
      detalles: ['', Validators.required]
    });
    this.getPregunta()

  }

  getPregunta() {
    if (localStorage.getItem('pregunta') != null) {
      this.preguntaForm.setValue({
        pregunta: localStorage.getItem('pregunta'),
        detalles: ''
      });
    }
  }

  subirPregunta() {
    const pregunta = {
      idPersona: this.iduser,
      pregunta: this.preguntaForm.value.pregunta,
      detalles: this.preguntaForm.value.detalles,
      actualizaciones: [],
      categoria: this.categoria,
      repuestas: []
    }
    this.comunidad.addPreguntaNueva(pregunta).subscribe(res => {
      this.respuesta = res;
      localStorage.removeItem('pregunta');
      this.router.navigate(['/comunidad/pregunta/', this.respuesta.detail.ruta]);
    });
  }
  onChange($event: any): void {
    console.log("onChange");
    //this.log += new Date() + "<br />";
  }

  onPaste($event: any): void {
    console.log("onPaste");
    //this.log += new Date() + "<br />";
  }
}
