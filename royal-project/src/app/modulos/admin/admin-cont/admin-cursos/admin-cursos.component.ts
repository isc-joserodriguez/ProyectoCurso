import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-admin-cursos',
  templateUrl: './admin-cursos.component.html',
  styleUrls: ['./admin-cursos.component.scss']
})
export class AdminCursosComponent implements OnInit {
  // Variables Solicitudes Cursos
  variable = false;
  listaSolicitudes = []
  displayedColumns: string[] = ['maestro', 'curso', 'fecha', 'revision'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // Variables Cursos
  listaCursos = [];
  colCursos: string[] = ['maestro', 'curso', 'fecha', 'estado', 'publicado', 'editar'];
  datosCursos: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginasCursos: MatPaginator;
  @ViewChild(MatSort) ordenCursos: MatSort;

  // Variables reportes cursos
  listareportes = []
  colrepo: string[] = ['curso','maestro','reporta','fecha','revision'];
  datosReportes: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginaRepor: MatPaginator;
  @ViewChild(MatSort) ordenRepor: MatSort;

  constructor() {
    // datasource solicitudes
    this.dataSource = new MatTableDataSource(this.listaSolicitudes);
    // datasource cursos
    this.datosCursos = new MatTableDataSource(this.listaCursos);
    // datasource reportes
    this.datosReportes = new MatTableDataSource(this.listareportes);
  }

  ngOnInit() {
    // inic. solicitudes
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getSolicitudesCursos();

    // inic. cursos
    this.datosCursos.paginator = this.paginasCursos;
    this.datosCursos.sort = this.ordenCursos;
    this.getCursos();

    // inic. reportes
    this.datosReportes.paginator = this.paginaRepor;
    this.datosReportes.sort = this.ordenRepor;
    this.getReportes();
  }
  getReportes() {
    this.listareportes = []
    this.listareportes = [
      { "id": 1, "maestro": "Mario Alberto Gomez", "curso": "Programación", "fecha": "12/12/2018","reporta":"José Antonio" },
      { "id": 2, "maestro": "Maria Lopez Gomez", "curso": "Programación", "fecha": "12/12/2018" ,"reporta":"Carla Reyes"},
      { "id": 3, "maestro": "Mario Alberto Gomez", "curso": "Programación", "fecha": "12/12/2018","reporta":"José Antonio"},
      { "id": 4, "maestro": "Maria Lopez Gomez", "curso": "Programación", "fecha": "12/12/2018","reporta":"Carla Reyes" },
      { "id": 5, "maestro": "Mario Alberto Gomez", "curso": "Programación", "fecha": "12/12/2018","reporta":"José Antonio" },
      { "id": 6, "maestro": "Maria Lopez Gomez", "curso": "Programación", "fecha": "12/12/2018","reporta":"Carla Reyes" }
    ];
    this.datosReportes = new MatTableDataSource(this.listareportes);
    this.datosReportes.paginator = this.paginaRepor;
    this.datosReportes.sort = this.ordenRepor;
  }

  getSolicitudesCursos() {
    this.listaSolicitudes = []
    this.listaSolicitudes = [
      { "id": 1, "nombre": "Mario Alberto Gomez", "curso": "Programación", "fecha": "12/12/2018" },
      { "id": 2, "nombre": "Maria Lopez Gomez", "curso": "Programación", "fecha": "12/12/2018" },
      { "id": 3, "nombre": "Mario Alberto Gomez", "curso": "Programación", "fecha": "12/12/2018" },
      { "id": 4, "nombre": "Maria Lopez Gomez", "curso": "Programación", "fecha": "12/12/2018" },
      { "id": 5, "nombre": "Mario Alberto Gomez", "curso": "Programación", "fecha": "12/12/2018" },
      { "id": 6, "nombre": "Maria Lopez Gomez", "curso": "Programación", "fecha": "12/12/2018" },
      { "id": 7, "nombre": "Mario Alberto Gomez", "curso": "Programación", "fecha": "12/12/2018" },
      { "id": 8, "nombre": "Maria Lopez Gomez", "curso": "Programación", "fecha": "12/12/2018" }
    ];
    this.dataSource = new MatTableDataSource(this.listaSolicitudes);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  getCursos() {
    this.listaCursos = []
    this.listaCursos = [
      { "publicado": true, "estado": "Aceptado", "id": 1, "nombre": "Mario Alberto Gomez", "curso": "Programación", "fecha": "12/12/2018" },
      { "publicado": false, "estado": "Aceptado", "id": 2, "nombre": "Maria Lopez Gomez", "curso": "Programación", "fecha": "12/12/2018" },
      { "publicado": true, "estado": "Rechazado", "id": 3, "nombre": "Mario Alberto Gomez", "curso": "Programación", "fecha": "12/12/2018" },
      { "publicado": true, "estado": "Aceptado", "id": 4, "nombre": "Maria Lopez Gomez", "curso": "Programación", "fecha": "12/12/2018" },
      { "publicado": true, "estado": "Aceptado", "id": 5, "nombre": "Mario Alberto Gomez", "curso": "Programación", "fecha": "12/12/2018" },
      { "publicado": true, "estado": "Aceptado", "id": 6, "nombre": "Maria Lopez Gomez", "curso": "Programación", "fecha": "12/12/2018" },
      { "publicado": true, "estado": "Rechazado", "id": 7, "nombre": "Mario Alberto Gomez", "curso": "Programación", "fecha": "12/12/2018" },
      { "publicado": true, "estado": "Rechazado", "id": 8, "nombre": "Maria Lopez Gomez", "curso": "Programación", "fecha": "12/12/2018" },
      { "publicado": true, "estado": "Rechazado", "id": 8, "nombre": "Maria Lopez Gomez", "curso": "Programación", "fecha": "12/12/2018" }
    ];
    this.datosCursos = new MatTableDataSource(this.listaCursos);
    this.datosCursos.paginator = this.paginasCursos;
    this.datosCursos.sort = this.ordenCursos;
  }
  revisarCurso(id) {
    console.log('se revisó el curso ' + id)
  }
  editarCurso(id) {
    console.log('Se editó el curso ' + id)
  }
}
