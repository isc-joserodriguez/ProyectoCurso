import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CursosService } from 'src/app/servicios/cursos.service';

@Component({
  selector: 'app-estatus-cursos',
  templateUrl: './estatus-cursos.component.html',
  styleUrls: ['./estatus-cursos.component.scss']
})
export class EstatusCursosComponent implements OnInit {
  // Variables Cursos
  listaCursos = [];
  colCursos: string[] = ['curso', 'fecha', 'estado', 'publicado', 'editar'];
  datosCursos: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router, private cursos: CursosService) {
    // datasource cursos
    this.datosCursos = new MatTableDataSource(this.listaCursos);
  }

  ngOnInit() {
    // inic. cursos
    this.datosCursos.paginator = this.paginator;
    this.datosCursos.sort = this.sort;
    this.getCursos();
  }

  getCursos() {
    this.listaCursos = [];
    this.cursos.getCursos().subscribe((res: any) => {
      res.detail.forEach(curso => {
        if (curso.idMaestro == localStorage.getItem('userid')) {
          this.listaCursos.push({
            id: curso._id,
            curso: curso.nombreCorto,
            fecha: curso.fechaSolicitud,
            ruta: curso.ruta,
            estado: this.getEstatus(curso.estado),
            publicado: curso.publicacion
          });
          this.datosCursos = new MatTableDataSource(this.listaCursos);
          this.datosCursos.paginator = this.paginator;
          this.datosCursos.sort = this.sort;
        }
      });
    });
  }
  getEstatus(estado) {
    if (estado == 1) {
      return 'En revisión';
    } else if (estado == 2) {
      return 'Aceptado';
    } else {
      return 'Rechazado';
    }
  }
  configCurso(ruta) {
    this.router.navigate(['/maestro/curso/config/', ruta]);
  }
}
