import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-admin-usuarios',
  templateUrl: './admin-usuarios.component.html',
  styleUrls: ['./admin-usuarios.component.scss']
})
export class AdminUsuariosComponent implements OnInit {
  displayedColumns: string[] = ['img', 'nombre', 'apellidos', 'estatus', 'acciones'];
  dataSource: MatTableDataSource<any>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
  constructor() {
    this.dataSource = new MatTableDataSource([
      { img: 'http://www.lorempixel.com/200/200', nombre: 'Alfonso', apellidos: 'Lopez Meza', estatus: 'Activo', acciones: 'hola' },
      { img: 'http://www.lorempixel.com/200/200', nombre: 'Mario', apellidos: 'Luna Gonzalez', estatus: 'Activo', acciones: 'hola' },
      { img: 'http://www.lorempixel.com/200/200', nombre: 'Laura', apellidos: 'Martinez Anaya', estatus: 'Activo', acciones: 'hola' },
      { img: 'http://www.lorempixel.com/200/200', nombre: 'Samuel', apellidos: 'Ruiz Luna', estatus: 'Activo', acciones: 'hola' },
      { img: 'http://www.lorempixel.com/200/200', nombre: 'Carlos', apellidos: 'Reyes Lopez', estatus: 'Activo', acciones: 'hola' },
      { img: 'http://www.lorempixel.com/200/200', nombre: 'Pablo', apellidos: 'Hola Adios', estatus: 'Activo', acciones: 'hola' }
    ]);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
