import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { CursosService } from 'src/app/servicios/cursos.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-maestro-alumnos',
  templateUrl: './maestro-alumnos.component.html',
  styleUrls: ['./maestro-alumnos.component.scss']
})
export class MaestroAlumnosComponent implements OnInit {
  respuesta: any = {
    code: 0,
    msg: '',
    detail: ''
  };

  infoAlumno: any = {
    code: 0,
    msg: '',
    detail: ''
  };

  // Variables Cursos
  listaAlumnos = [];
  displayedColumns: string[] = ['foto', 'nombre', 'correo', 'calificaciones'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router, private route: ActivatedRoute, private cursos: CursosService, private usuarios: UsuariosService) {
    // datasource cursos
    this.dataSource = new MatTableDataSource(this.listaAlumnos);
  }

  ngOnInit() {
    // inic. cursos
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getAlumnos();
  }
  getAlumnos() {
    this.listaAlumnos = [];
    this.cursos.getCursoInfo(this.route.snapshot.params.id).subscribe(res => {
      this.respuesta = res;
      this.respuesta.detail[0].alumnosInscritos.forEach(alumnoInscrito => {
        this.usuarios.getUser(alumnoInscrito.idAlumno).subscribe(alumnoInfo => {
          this.infoAlumno = alumnoInfo;
          console.log(this.infoAlumno.detail[0].foto);
          this.listaAlumnos.push({
            foto: this.infoAlumno.detail[0].foto,
            nombre: this.infoAlumno.detail[0].nombre + ' ' + this.infoAlumno.detail[0].apPaterno + ' ' + this.infoAlumno.detail[0].apMaterno,
            correo: this.infoAlumno.detail[0].credencial.correo
          });
          this.dataSource = new MatTableDataSource(this.listaAlumnos);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
      });
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}