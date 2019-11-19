import { Component, OnInit, ViewChild } from '@angular/core';
import { CursosService } from 'src/app/servicios/cursos.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-maestro-insignias',
  templateUrl: './maestro-insignias.component.html',
  styleUrls: ['./maestro-insignias.component.scss']
})
export class MaestroInsigniasComponent implements OnInit {
  displayedColumns: string[] = ['imagen', 'nombreInsignia', 'descripcionInsignia', 'otorgar', 'editar'];

  listaInsignias = [];
  listaAlumno = [];
  insigniaOtorgar: any;
  dataSource: MatTableDataSource<any>;

  divOtorgar = false;
  indexInsignia = 0;

  nuevoAlumno = '';
  error = '';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private usuarios: UsuariosService, private cursos: CursosService, private router: Router, private route: ActivatedRoute) {
    this.dataSource = new MatTableDataSource(this.listaInsignias);
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.listaInsignias = [];
      this.listaAlumno = [];
      this.divOtorgar = false;
      this.nuevoAlumno = '';
      this.error = '';
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.getInsignias(params.get('id'));
      this.getAlumnos();
    });
  }

  getInsignias(id) {
    this.listaInsignias = [];
    this.cursos.getCursoInfo(id).subscribe((resp: any) => {
      this.listaInsignias = resp.detail[0].insignias;
      this.dataSource = new MatTableDataSource(this.listaInsignias);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  getAlumnos() {
    this.cursos.getCursoInfo(this.route.snapshot.params.id).subscribe((res: any) => {
      res.detail[0].alumnosInscritos.forEach(alumnoInscrito => {
        this.usuarios.getUser(alumnoInscrito.idAlumno).subscribe((usuario: any) => {
          this.listaAlumno.push(usuario.detail[0].nombre + ' ' + usuario.detail[0].apPaterno + ' ' + usuario.detail[0].apMaterno + ' - ' + usuario.detail[0].credencial.correo);
        });
      });
    });
  }

  otorgar(i) {
    this.insigniaOtorgar = this.listaInsignias[i];
    this.indexInsignia = i;
    this.divOtorgar = true;
  }

  subirInsignia() {
    this.cursos.getCursoInfo(this.route.snapshot.params.id).subscribe((curso: any) => {
      curso.detail[0].alumnosInscritos.forEach(alumnoInscrito => {
        this.usuarios.getUser(alumnoInscrito.idAlumno).subscribe((usuario: any) => {
          var nuevo = usuario.detail[0].nombre + ' ' + usuario.detail[0].apPaterno + ' ' + usuario.detail[0].apMaterno + ' - ' + usuario.detail[0].credencial.correo
          if (nuevo.toLowerCase().includes(this.nuevoAlumno.toLowerCase())) {
            var repetido = false;
            usuario.detail[0].insignias.forEach(insignia => {
              if (this.route.snapshot.params.id == insignia.ruta) {
                if (insignia.idInsignia == this.indexInsignia) {
                  repetido = true
                }
              }
            });
            if (!repetido) {
              usuario.detail[0].insignias.push({ idInsignia: this.indexInsignia, ruta: this.route.snapshot.params.id });
              this.usuarios.updateInsignia(usuario.detail[0]._id, { insignias: usuario.detail[0].insignias, puntaje: usuario.detail[0].puntaje + 50 }).subscribe(res => {
                this.listaInsignias[this.indexInsignia].otorgadas = this.listaInsignias[this.indexInsignia].otorgadas + 1;
                this.cursos.updateInsignias(this.route.snapshot.params.id, { insignias: this.listaInsignias }).subscribe(res => {
                  //Notificar
                  usuario.detail[0].notificaciones.push({
                    ruta: '/perfil/insignias',
                    descripcion: 'Recibiste insignia en el curso de ' + curso.detail[0].nombreCorto + '.'
                  });
                  this.usuarios.updateNotificaciones(usuario.detail[0]._id, { notificaciones: usuario.detail[0].notificaciones }).subscribe(res => {
                    this.ngOnInit();
                  });
                  //
                });
              });
            } else {
              this.error = 'Ya se le ha otorgado esta insignia.'
            }
          }
        });
      });
    });
  }

  filtrarAlumno(cadena) {
    this.listaAlumno = [];
    this.cursos.getCursoInfo(this.route.snapshot.params.id).subscribe((res: any) => {
      res.detail[0].alumnosInscritos.forEach(alumnoInscrito => {
        this.usuarios.getUser(alumnoInscrito.idAlumno).subscribe((usuario: any) => {
          var nuevo = usuario.detail[0].nombre + ' ' + usuario.detail[0].apPaterno + ' ' + usuario.detail[0].apMaterno + ' - ' + usuario.detail[0].credencial.correo
          if (nuevo.toLowerCase().includes(cadena.toLowerCase())) {
            this.listaAlumno.push(nuevo);
          }
        });
      });
    });
  }

  editar(id) {
    this.router.navigate(['/maestro/curso/', this.route.snapshot.params.id, 'insignias', 'editar', id]);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
