import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComunidadService } from 'src/app/servicios/comunidad.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-comunidad',
  templateUrl: './comunidad.component.html',
  styleUrls: ['./comunidad.component.scss']
})
export class ComunidadComponent implements OnInit {
  categoria = this.route.snapshot.params.categoria;
  iduser = localStorage.getItem('userid') == null;
  listaPreguntas = [];
  preguntaForm: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, private usuarios: UsuariosService, private comunidad: ComunidadService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.preguntaForm = this.formBuilder.group({
        pregunta: ['', Validators.required]
      });
      this.categoria = params.get('categoria');
      this.iduser = localStorage.getItem('userid') == null;
      this.listaPreguntas = [];
      this.getPregunta();
      this.getListaPreguntas(params.get('categoria'));
    });
  }
  getListaPreguntas(cat) {
    this.listaPreguntas = [];
    this.comunidad.getPreguntas().subscribe((res: any) => {
      res.detail.forEach(pregunta => {
        if (pregunta.categoria == cat) {
          this.usuarios.getUser(pregunta.idPersona).subscribe((info: any) => {
            this.listaPreguntas.push({
              //Pendiente
              insignias: info.detail[0].insignias.length,
              cursos: info.detail[0].cursoAlumno.length,
              fecha: pregunta.fecha,
              foto: info.detail[0].foto,
              rutaPersona: info.detail[0].ruta,
              id: pregunta.idPersona,
              detalles: pregunta.detalles,
              pregunta: pregunta.pregunta,
              ruta: pregunta.ruta,
              nombre: info.detail[0].nombre + ' ' + info.detail[0].apPaterno + ' ' + info.detail[0].apMaterno
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
