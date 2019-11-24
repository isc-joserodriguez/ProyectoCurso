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

  // Variables Notificaciones
  listaNotificaciones = [];
  colNotificaciones: string[] = ['descripcion', 'fecha', 'estado', 'ver'];
  datosNotificaciones: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private usuarios: UsuariosService) {
    // datasource notificaciones
    this.datosNotificaciones = new MatTableDataSource(this.listaNotificaciones);
  }

  ngOnInit() {
    // inic. notificaciones
    this.datosNotificaciones.paginator = this.paginator;
    this.datosNotificaciones.sort = this.sort;
    this.getNotificaciones();
  }

  getNotificaciones() {
    this.listaNotificaciones = [];
    this.usuarios.getUser(localStorage.getItem('userid')).subscribe((res: any) => {
      this.listaNotificaciones = res.detail[0].notificaciones.reverse();
      this.datosNotificaciones = new MatTableDataSource(this.listaNotificaciones);
      this.datosNotificaciones.paginator = this.paginator;
      this.datosNotificaciones.sort = this.sort;
    });
  }
}
