import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CursosService } from 'src/app/servicios/cursos.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-admin-inscripcion',
  templateUrl: './admin-inscripcion.component.html',
  styleUrls: ['./admin-inscripcion.component.scss']
})
export class AdminInscripcionComponent implements OnInit {
  nuevoAlumno = '';

  error = '';

  infoCurso: any = {
    _id: 0,
    categoria: '',
    descripcionCurso: '',
    nombreCompleto: '',
    precio: 0,
    subcategoria: '',
    imagen: 'http://www.lorempixel.com/200/200',
    alumnosInscritos: [],
    ruta: ''
  }

  inscribir = false;
  listaAlumno = [];

  // Variables Cursos
  listaCursos = [];
  displayedColumns: string[] = ['maestro', 'curso', 'fecha', 'estado', 'publicado', 'inscripcion'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router, private cursos: CursosService, private usuarios: UsuariosService) {
    // datasource cursos
    this.dataSource = new MatTableDataSource(this.listaCursos);
  }

  ngOnInit() {
    // inic. cursos
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getCursos();
    this.getAlumnos();
  }
  getAlumnos() {
    this.usuarios.getAll().subscribe((res: any) => {
      res.detail.forEach(usuario => {
        if (usuario.tipo[3].alumno) {
          this.listaAlumno.push(usuario.nombre + ' ' + usuario.apPaterno + ' ' + usuario.apMaterno + ' - ' + usuario.credencial.correo);
        }
      });
    });
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
          this.dataSource = new MatTableDataSource(this.listaCursos);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
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
  mostrarCurso(id) {
    this.cursos.getCursoInfo(id).subscribe((res: any) => {
      this.infoCurso = res.detail[0];
      this.inscribir = true;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  filtrarAlumno(cadena) {
    this.listaAlumno = [];
    this.usuarios.getAll().subscribe((res: any) => {
      res.detail.forEach(usuario => {
        if (usuario.tipo[3].alumno) {
          var nuevo = usuario.nombre + ' ' + usuario.apPaterno + ' ' + usuario.apMaterno + ' - ' + usuario.credencial.correo
          if (nuevo.toLowerCase().includes(cadena.toLowerCase())) {
            this.listaAlumno.push(nuevo);
          }
        }
      });
    });
  }

  inscribirAlumno() {
    this.usuarios.getAll().subscribe((res: any) => {
      res.detail.forEach(usuario => {
        if (usuario.tipo[3].alumno) {
          var nuevo = usuario.nombre + ' ' + usuario.apPaterno + ' ' + usuario.apMaterno + ' - ' + usuario.credencial.correo
          if (nuevo.toLowerCase().includes(this.nuevoAlumno.toLowerCase()) && this.nuevoAlumno != '') {
            var repetido = false;
            usuario.cursoAlumno.forEach(curso => {
              if (curso.ruta == this.infoCurso.ruta) {
                repetido = true
              }
            });
            if (!repetido) {
              usuario.cursoAlumno.push({ ruta: this.infoCurso.ruta });
              console.log(usuario.cursoAlumno);
              this.usuarios.inscribirAlumno(usuario._id, { cursoAlumno: usuario.cursoAlumno, puntaje: usuario.puntaje + 100 }).subscribe(res => {
                this.infoCurso.alumnosInscritos.push({ idAlumno: usuario._id });
                this.cursos.inscribirAlumno(this.infoCurso._id, this.infoCurso.alumnosInscritos).subscribe(res => {
                  this.inscribir = false;
                  this.error = '';
                });
              });
            } else {
              this.error = 'El usuario ya está registrado';
            }
          }

        }
      });
    });

  }

}
