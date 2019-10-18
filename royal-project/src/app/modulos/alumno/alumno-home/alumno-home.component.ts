import { Component, OnInit } from '@angular/core';
import { CursosService } from 'src/app/servicios/cursos.service';


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
  cursosIdiomas = [];
  cursosTec = [];

  constructor(private cursos: CursosService) { }

  ngOnInit() {
    window.scrollTo(0, 0);
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
      });
    });
  }

}