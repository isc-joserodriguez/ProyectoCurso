import { Component, OnInit } from '@angular/core';
import { CursosService } from '../../../servicios/cursos.service';


@Component({
  selector: 'app-alumno-home',
  templateUrl: './alumno-home.component.html',
  styleUrls: ['./alumno-home.component.scss']
})
export class AlumnoHomeComponent implements OnInit {
  respuesta: any = {
    code: 200,
    detail: '',
    msg: ''
  };
  cursosIdiomas = [
    { imagen: 'http://www.lorempixel.com/200/200', nombreCorto: 'Árabe I', descripcionCurso: 'Aprende' },
    { imagen: 'http://www.lorempixel.com/200/200', nombreCorto: 'Árabe I', descripcionCurso: 'Aprende' },
    { imagen: 'http://www.lorempixel.com/200/200', nombreCorto: 'Árabe I', descripcionCurso: 'Aprende' },
    { imagen: 'http://www.lorempixel.com/200/200', nombreCorto: 'Árabe I', descripcionCurso: 'Aprende' },
    { imagen: 'http://www.lorempixel.com/200/200', nombreCorto: 'Árabe I', descripcionCurso: 'Aprende' },
    { imagen: 'http://www.lorempixel.com/200/200', nombreCorto: 'Árabe I', descripcionCurso: 'Aprende' },
    { imagen: 'http://www.lorempixel.com/200/200', nombreCorto: 'Árabe I', descripcionCurso: 'Aprende' },
    { imagen: 'http://www.lorempixel.com/200/200', nombreCorto: 'Árabe I', descripcionCurso: 'Aprende' },
    { imagen: 'http://www.lorempixel.com/200/200', nombreCorto: 'Árabe I', descripcionCurso: 'Aprende' },
    { imagen: 'http://www.lorempixel.com/200/200', nombreCorto: 'Árabe I', descripcionCurso: 'Aprende' }
  ];
  cursosTec = [
    { imagen: 'http://www.lorempixel.com/200/200', nombreCorto: 'POO', descripcionCurso: 'Aprende' },
    { imagen: 'http://www.lorempixel.com/200/200', nombreCorto: 'POO', descripcionCurso: 'Aprende' },
    { imagen: 'http://www.lorempixel.com/200/200', nombreCorto: 'POO', descripcionCurso: 'Aprende' },
    { imagen: 'http://www.lorempixel.com/200/200', nombreCorto: 'POO', descripcionCurso: 'Aprende' },
    { imagen: 'http://www.lorempixel.com/200/200', nombreCorto: 'POO', descripcionCurso: 'Aprende' },
    { imagen: 'http://www.lorempixel.com/200/200', nombreCorto: 'POO', descripcionCurso: 'Aprende' },
    { imagen: 'http://www.lorempixel.com/200/200', nombreCorto: 'POO', descripcionCurso: 'Aprende' },
    { imagen: 'http://www.lorempixel.com/200/200', nombreCorto: 'POO', descripcionCurso: 'Aprende' },
    { imagen: 'http://www.lorempixel.com/200/200', nombreCorto: 'POO', descripcionCurso: 'Aprende' },
    { imagen: 'http://www.lorempixel.com/200/200', nombreCorto: 'POO', descripcionCurso: 'Aprende' }
  ];

  constructor(private cursos: CursosService) { }

  ngOnInit() {
    this.getCursos();
  }

  getCursos() {
    this.cursos.getCursosAprobados().subscribe(res => {
      this.respuesta = res;
      this.respuesta.detail.forEach(curso => {
        if (curso.categoria == 'Tecnología') {
          this.cursosTec.push(curso);
        } else {
          this.cursosIdiomas.push(curso);
        }
        console.log(curso);
      });
    });
  }

}
