import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CursosService } from 'src/app/servicios/cursos.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-admin-cursos',
  templateUrl: './admin-cursos.component.html',
  styleUrls: ['./admin-cursos.component.scss']
})
export class AdminCursosComponent implements OnInit {
  solicitudes = false;
  reportes = false;

  listaSolicitudes = [];
  displayedColumns: string[] = ['maestro', 'curso', 'fecha', 'revision'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // Variables Cursos
  listaCursos = [];
  colCursos: string[] = ['maestro', 'curso', 'fecha', 'estado', 'publicado', 'editar'];
  datosCursos: MatTableDataSource<any>;
  @ViewChild('paginasCursos', { read: MatPaginator }) paginasCursos: MatPaginator;
  @ViewChild(MatSort) ordenCursos: MatSort;

  // Variables reportes cursos
  listareportes = [];
  colrepo: string[] = ['curso', 'maestro', 'reporta', 'fecha', 'revision'];
  datosReportes: MatTableDataSource<any>;
  @ViewChild('paginaRepor', { read: MatPaginator }) paginaRepor: MatPaginator;
  @ViewChild(MatSort) ordenRepor: MatSort;

  constructor(private router: Router, private cursos: CursosService, private usuarios: UsuariosService) { }

  ngOnInit() {
    // inic. solicitudes
    this.getSolicitudesCursos();
    // inic. cursos
    this.getCursos();
    // inic. reportes
    this.getReportes();
  }

  getSolicitudesCursos() {
    this.listaSolicitudes = [];
    this.cursos.getCursosSolicitudes().subscribe((res: any) => {
      res.detail.forEach(curso => {
        this.usuarios.getId(curso.idMaestro).subscribe((maestro: any) => {
          this.listaSolicitudes.push({
            id: curso._id,
            nombre: maestro.detail[0].nombre + ' ' +
              maestro.detail[0].apPaterno + ' ' + maestro.detail[0].apMaterno,
            curso: curso.nombreCorto,
            fecha: curso.fechaSolicitud,
            ruta: curso.ruta
          });
          this.solicitudes = this.listaSolicitudes.length != 0;
          this.dataSource = new MatTableDataSource(this.listaSolicitudes);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
      });
    });
  }

  getReportes() {
    this.listareportes = [];
    this.listareportes = [
      { id: 1, maestro: 'Marioassads Alberto Gomez', curso: 'Programación', fecha: '12/12/2018', reporta: 'José Antonio' },
      { id: 2, maestro: 'Maria Lopez Gomez', curso: 'Programación', fecha: '12/12/2018', reporta: 'Carla Reyes' },
      { id: 3, maestro: 'Mario Alberto Gomez', curso: 'Programación', fecha: '12/12/2018', reporta: 'José Antonio' },
      { id: 4, maestro: 'Maria Lopez Gomez', curso: 'Programación', fecha: '12/12/2018', reporta: 'Carla Reyes' },
      { id: 5, maestro: 'Mario Alberto Gomez', curso: 'Programación', fecha: '12/12/2018', reporta: 'José Antonio' },
      { id: 6, maestro: 'Maria Lopez Gomez', curso: 'Programación', fecha: '12/12/2018', reporta: 'Carla Reyes' }
    ];
    this.datosReportes = new MatTableDataSource(this.listareportes);
    this.datosReportes.paginator = this.paginaRepor;
    this.datosReportes.sort = this.ordenRepor;
  }

  getCursos() {
    this.listaCursos = [];
    this.cursos.getCursos().subscribe((res: any) => {
      res.detail.forEach(curso => {
        this.usuarios.getId(curso.idMaestro).subscribe((maestro: any) => {
          this.listaCursos.push({
            nombre: maestro.detail[0].nombre + ' ' +
              maestro.detail[0].apPaterno + ' ' + maestro.detail[0].apMaterno,
            id: curso._id,
            curso: curso.nombreCorto,
            fecha: curso.fechaSolicitud,
            ruta: curso.ruta,
            estado: this.getEstatus(curso.estado),
            publicado: curso.publicacion
          });
          this.datosCursos = new MatTableDataSource(this.listaCursos);
          this.datosCursos.paginator = this.paginasCursos;
          this.datosCursos.sort = this.ordenCursos;
        });
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
  revisarCurso(id) {
    this.router.navigate(['/admin/cursos/revisar/', id]);
  }
  editarCurso(id) {
    console.log('Se editó el curso ' + id);
  }
}
