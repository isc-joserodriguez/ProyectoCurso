import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CursosService } from 'src/app/servicios/cursos.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-maestro-alumnos',
  templateUrl: './maestro-alumnos.component.html',
  styleUrls: ['./maestro-alumnos.component.scss']
})
export class MaestroAlumnosComponent implements OnInit {
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
    this.route.paramMap.subscribe((params: ParamMap) => {
      window.scrollTo(0, 0);
      this.listaAlumnos = [];
      this.dataSource = new MatTableDataSource(this.listaAlumnos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.getAlumnos();
    });
  }
  getAlumnos() {
    this.cursos.getCursoInfo(this.route.snapshot.params.id).subscribe((res: any) => {
      res.detail[0].alumnosInscritos.forEach(alumnoInscrito => {
        this.usuarios.getUser(alumnoInscrito.idAlumno).subscribe((alumnoInfo: any) => {
          this.listaAlumnos.push({
            foto: alumnoInfo.detail[0].foto,
            nombre: alumnoInfo.detail[0].nombre + ' ' + alumnoInfo.detail[0].apPaterno + ' ' + alumnoInfo.detail[0].apMaterno,
            correo: alumnoInfo.detail[0].credencial.correo,
            ruta: alumnoInfo.detail[0].ruta
          });
          this.dataSource = new MatTableDataSource(this.listaAlumnos);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
      });
    });
  }

  calificar(id){
    this.router.navigate(['maestro/curso',this.route.snapshot.params.id,'revision',id]);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}