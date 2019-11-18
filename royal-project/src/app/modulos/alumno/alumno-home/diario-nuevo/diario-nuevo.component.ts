import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DiarioService } from 'src/app/servicios/diario.service';
import { CursosService } from 'src/app/servicios/cursos.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-diario-nuevo',
  templateUrl: './diario-nuevo.component.html',
  styleUrls: ['./diario-nuevo.component.scss']
})
export class DiarioNuevoComponent implements OnInit {
  //ckeditor
  name = 'ng2-ckeditor';
  ckeConfig: any;
  mycontent: string;
  log: string = '';
  @ViewChild("myckeditor") ckeditor: any;
  //fin ckeditor
  iduser = localStorage.getItem('userid');
  entradaForm: FormGroup;

  subcategorias = [];

  constructor(private usuarios: UsuariosService, private cursos: CursosService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private diario: DiarioService) { }

  ngOnInit() {
    this.ckeConfig = {
      allowedContent: false,
      forcePasteAsPlainText: true,
      extraPlugins: 'colorbutton',

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
    if (this.iduser == null) {
      this.router.navigate(['/']);
    }
    this.entradaForm = this.formBuilder.group({
      categoria: ['', Validators.required],
      titulo: ['', Validators.required],
      escrito: ['', Validators.required]
    });
    this.getSubcategorias();
  }
  getSubcategorias() {
    this.cursos.getSubcategorias().subscribe((res: any) => {
      res.detail.forEach(e => {
        if (e.categoria == "Idiomas")
          this.subcategorias.push(e.subcategoria)
      });
      var a = [];
      new Set(this.subcategorias).forEach(e => {
        a.push(e);
      });
      this.subcategorias = a;
    });
  }

  subirPregunta() {
    const entrada = {
      idPersona: this.iduser,
      titulo: this.entradaForm.value.titulo,
      escrito: this.entradaForm.value.escrito,
      categoria: this.entradaForm.value.categoria
    };
    this.diario.addEntradaNueva(entrada).subscribe((res: any) => {
      this.usuarios.getUser(localStorage.getItem('userid')).subscribe((info: any) => {
        info.detail[0].puntaje = info.detail[0].puntaje + 20;
        this.usuarios.updatePuntaje(localStorage.getItem('userid'), { puntaje: info.detail[0].puntaje }).subscribe(nv => {
          this.router.navigate(['/diario/entrada/', res.detail.ruta]);
        });
      });
    });
  }

}
