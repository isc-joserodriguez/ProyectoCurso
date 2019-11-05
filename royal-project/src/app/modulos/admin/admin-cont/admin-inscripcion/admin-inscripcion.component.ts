import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CursosService } from 'src/app/servicios/cursos.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ComprasService } from 'src/app/servicios/compras.service';

@Component({
  selector: 'app-admin-inscripcion',
  templateUrl: './admin-inscripcion.component.html',
  styleUrls: ['./admin-inscripcion.component.scss']
})
export class AdminInscripcionComponent implements OnInit {
  abonar = false;
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

  cobroForm: FormGroup;

  // Variables Cursos
  listaCursos = [];
  displayedColumns: string[] = ['maestro', 'curso', 'fecha', 'estado', 'publicado', 'inscripcion'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private compras: ComprasService, private cursos: CursosService, private usuarios: UsuariosService, private formBuilder: FormBuilder) {
    // datasource cursos
    this.dataSource = new MatTableDataSource(this.listaCursos);
  }

  ngOnInit() {
    this.cobroForm = this.formBuilder.group({
      abono: ['', [Validators.required, Validators.min(395)]],
      fecha: ['', Validators.required]
    });
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
      this.error = '';
      this.cobroForm = this.formBuilder.group({
        abono: ['', [Validators.required, Validators.min(395)]],
        fecha: ['', Validators.required]
      });
      this.abonar = false;
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
    var encontrado = false;
    this.usuarios.getAll().subscribe((res: any) => {
      res.detail.forEach(usuario => {
        if (usuario.tipo[3].alumno) {
          var nuevo = usuario.nombre + ' ' + usuario.apPaterno + ' ' + usuario.apMaterno + ' - ' + usuario.credencial.correo
          if (nuevo.toLowerCase().includes(this.nuevoAlumno.toLowerCase()) && this.nuevoAlumno != '') {
            var repetido = false;
            encontrado = true;
            usuario.cursoAlumno.forEach(curso => {
              if (curso.ruta == this.infoCurso.ruta) {
                repetido = true
              }
            });
            if (!repetido) {
              usuario.cursoAlumno.push({ ruta: this.infoCurso.ruta });
              this.usuarios.inscribirAlumno(usuario._id, { cursoAlumno: usuario.cursoAlumno, puntaje: usuario.puntaje + 100 }).subscribe(res => {
                this.infoCurso.alumnosInscritos.push({ idAlumno: usuario._id });
                this.cursos.inscribirAlumno(this.infoCurso._id, this.infoCurso.alumnosInscritos).subscribe(res => {
                  var detalles: any = {
                    idAdmin: localStorage.getItem('userid'),
                    idPersona: usuario._id,
                    importe: this.infoCurso.precio,
                    abonos: [],
                    cursos: [{ ruta: this.infoCurso.ruta }],
                    resto: 0,
                    estado: 0
                  }
                  if (this.abonar) {
                    detalles.fechaLimite = this.cobroForm.value.fecha;
                    detalles.abonos.push({
                      idAdmin: localStorage.getItem('userid'),
                      importe: this.cobroForm.value.abono
                    });
                    detalles.resto = detalles.importe - this.cobroForm.value.abono;
                    detalles.estado = 1;
                  }
                  this.compras.addCompra(detalles).subscribe(res => {
                    this.inscribir = false;
                    this.error = '';
                    this.nuevoAlumno = '';
                  });
                });
              });
            } else {
              this.error = 'El usuario ya está registrado';
            }
          }

        }
      });
      if (!encontrado) this.error = 'Usuario no encontrado';
    });
  }

  abono() {
    this.abonar = (!this.abonar)
  }

}
