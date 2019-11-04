import { Component, OnInit } from '@angular/core';
import { CursosService } from 'src/app/servicios/cursos.service';


@Component({
  selector: 'app-alumno-home',
  templateUrl: './alumno-home.component.html',
  styleUrls: ['./alumno-home.component.scss']
})
export class AlumnoHomeComponent implements OnInit {
  cursosIdiomas = [];
  cursosTec = [];

  constructor(private cursos: CursosService) { }

  ngOnInit() {
    this.getCursos();
  }

  getCursos() {
    this.cursos.getCursosAprobados().subscribe((res:any) => {
      res.detail.forEach(curso => {
        if (curso.categoria == 'Tecnología') {
          this.cursosTec.push(curso);
        } else {
          this.cursosIdiomas.push(curso);
        }
      });
    });
  }

}