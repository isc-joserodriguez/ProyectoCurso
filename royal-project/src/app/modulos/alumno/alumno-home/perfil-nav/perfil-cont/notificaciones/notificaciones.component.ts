import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.scss']
})
export class NotificacionesComponent implements OnInit {

  // Variables Cursos
  listaCursos = [];
  colCursos: string[] = ['descripcion', 'fecha', 'estado', 'ver'];
  datosCursos: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private usuarios: UsuariosService) {
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
    this.usuarios.getUser(localStorage.getItem('userid')).subscribe((res: any) => {
      this.listaCursos = res.detail[0].notificaciones;
      this.datosCursos = new MatTableDataSource(this.listaCursos);
      this.datosCursos.paginator = this.paginator;
      this.datosCursos.sort = this.sort;
    });
  }

}
