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

  listaSolicitudes = [];
  displayedColumns: string[] = ['maestro', 'curso', 'fecha', 'revision'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // Variables Cursos
  listaCursos = [];
  colCursos: string[] = ['maestro', 'curso', 'fecha', 'publicado', 'editar'];
  datosCursos: MatTableDataSource<any>;
  @ViewChild('paginasCursos', { read: MatPaginator }) paginasCursos: MatPaginator;
  @ViewChild(MatSort) ordenCursos: MatSort;

  constructor(private router: Router, private cursos: CursosService, private usuarios: UsuariosService) { }

  ngOnInit() {
    // inic. solicitudes
    this.getSolicitudesCursos();
    // inic. cursos
    this.getCursos();
  }

  getSolicitudesCursos() {
    this.listaSolicitudes = [];
    this.cursos.getCursosSolicitudes().subscribe((res: any) => {
      res.detail.forEach(curso => {
        this.usuarios.getUser(curso.idMaestro).subscribe((maestro: any) => {
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

  getCursos() {
    this.listaCursos = [];
    this.cursos.getCursos().subscribe((res: any) => {
      res.detail.forEach(curso => {
        this.usuarios.getUser(curso.idMaestro).subscribe((maestro: any) => {
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
    this.router.navigate(['/admin/cursos/revisar/', id]);
  }
  applyFilter(filterValue: string) {
    this.datosCursos.filter = filterValue.trim().toLowerCase();
    if (this.datosCursos.paginator) {
      this.datosCursos.paginator.firstPage();
    }
  }
}
