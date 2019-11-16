import { Component, OnInit } from '@angular/core';
import { CursosService } from 'src/app/servicios/cursos.service';
import { ComunidadService } from 'src/app/servicios/comunidad.service';
import { DiarioService } from 'src/app/servicios/diario.service';
import { MatTableDataSource } from '@angular/material';


@Component({
  selector: 'app-alumno-home',
  templateUrl: './alumno-home.component.html',
  styleUrls: ['./alumno-home.component.scss']
})
export class AlumnoHomeComponent implements OnInit {
  cursosIdiomas = [];
  cursosTec = [];
  rankingDiario = [];
  colDiario: string[] = ['icon', 'categoria', 'fecha', 'conteo'];
  dataSourceDiario: MatTableDataSource<any>;
  rankingPreguntas = [];
  colPreguntas: string[] = ['icon', 'categoria', 'fecha', 'conteo'];
  dataSourcePreguntas: MatTableDataSource<any>;

  constructor(private cursos: CursosService, private comunidad: ComunidadService, private diario: DiarioService) { }

  ngOnInit() {
    this.getCursos();
    this.getEntradasDiario();
    this.getPreguntas();
  }

  getCursos() {
    this.cursos.getCursosAprobados().subscribe((res: any) => {
      res.detail.forEach(curso => {
        if (curso.categoria == 'Tecnología') {
          this.cursosTec.push(curso);
        } else {
          this.cursosIdiomas.push(curso);
        }
      });
    });
  }
  getEntradasDiario() {
    this.diario.getEntradas().subscribe((entradas: any) => {
      entradas.detail.forEach(entrada => {
        if (!entrada.reportado) {
          var repetido = false;
          var index = 0;
          this.rankingDiario.forEach((cat, i) => {
            if (cat.categoria == entrada.categoria) {
              repetido = true;
              index = i;
            }
          });
          if (repetido) {
            this.rankingDiario[index].conteo = this.rankingDiario[index].conteo + 1;
          } else {
            this.rankingDiario.push({
              conteo: 1,
              categoria: entrada.categoria,
              fecha: entrada.fecha
            });
          }
        }
      });
      this.rankingDiario = this.rankingDiario.sort(function (a, b) {
        return a.conteo - b.conteo;
      }).reverse();
      this.dataSourceDiario = new MatTableDataSource(this.rankingDiario);
    });
  }
  getPreguntas() {
    this.comunidad.getPreguntas().subscribe((preguntas: any) => {
      preguntas.detail.forEach(pregunta => {
        if (!pregunta.reportado) {
          var repetido = false;
          var index = 0;
          this.rankingPreguntas.forEach((cat, i) => {
            if (cat.categoria == pregunta.categoria) {
              repetido = true;
              index = i;
            }
          });
          if (repetido) {
            this.rankingPreguntas[index].conteo = this.rankingPreguntas[index].conteo + 1;
          } else {
            this.rankingPreguntas.push({
              conteo: 1,
              categoria: pregunta.categoria,
              fecha: pregunta.fecha
            });
          }
        }
      });
      this.rankingPreguntas = this.rankingPreguntas.sort(function (a, b) {
        return a.conteo - b.conteo;
      }).reverse();
      this.dataSourcePreguntas = new MatTableDataSource(this.rankingPreguntas);
    });
  }

}