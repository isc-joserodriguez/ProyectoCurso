import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComunidadService } from 'src/app/servicios/comunidad.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { CKEditorComponent } from 'ng2-ckeditor/ckeditor.component';

@Component({
  selector: 'app-comunidad',
  templateUrl: './comunidad.component.html',
  styleUrls: ['./comunidad.component.scss']
})
export class ComunidadComponent implements OnInit {
  name = 'ng2-ckeditor';
  ckeConfig: any;
  mycontent: string;
  log: string = '';
  @ViewChild("myckeditor") ckeditor: any;

  categoria = this.route.snapshot.params.categoria;
  iduser = localStorage.getItem('userid') == null;
  respuesta: any = {
    code: 0,
    msg: '',
    detail: ''
  };
  tempRes: any = {
    code: 0,
    msg: '',
    detail: ''
  };

  listaPreguntas = [];

  preguntaForm: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, private usuarios: UsuariosService, private comunidad: ComunidadService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    window.scrollTo(0, 0);
   

    this.preguntaForm = this.formBuilder.group({
      pregunta: ['', Validators.required]
    });
    this.getPregunta();
    this.getListaPreguntas(this.route.snapshot.params.categoria);
  }
  getListaPreguntas(cat) {
    this.listaPreguntas = [];
    this.comunidad.getPreguntas().subscribe(res => {
      this.respuesta = res
      this.respuesta.detail.forEach(pregunta => {
        if (pregunta.categoria == cat) {
          this.usuarios.getUser(pregunta.idPersona).subscribe(info => {
            this.tempRes = info;
            console.log(this.tempRes.detail[0])
            this.listaPreguntas.push({
              //Pendiente
              insignias: this.tempRes.detail[0].insignias.length,
              cursos: this.tempRes.detail[0].cursoAlumno.length,
              fecha: pregunta.fecha,
              foto: this.tempRes.detail[0].foto,
              id: pregunta.idPersona,
              detalles: pregunta.detalles,
              pregunta: pregunta.pregunta,
              ruta: pregunta.ruta
            });

          });
        }
      });
    });
  }
  getPregunta() {
    if (localStorage.getItem('pregunta') != null) {
      this.preguntaForm.setValue({
        pregunta: localStorage.getItem('pregunta')
      });
    }
  }

  hacerPregunta() {
    localStorage.setItem('pregunta', this.preguntaForm.value.pregunta);
    this.router.navigate(['/comunidad/nueva', this.categoria]);
  }

  




}
