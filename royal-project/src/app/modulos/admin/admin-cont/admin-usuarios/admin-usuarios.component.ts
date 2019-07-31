import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UsuariosService } from '../../../../servicios/usuarios.service';

@Component({
  selector: 'app-admin-usuarios',
  templateUrl: './admin-usuarios.component.html',
  styleUrls: ['./admin-usuarios.component.scss']
})
export class AdminUsuariosComponent implements OnInit {
  displayedColumns: string[] = ['img', 'nombre', 'apellidos', 'tipo', 'estatus', 'editar'];
  listaUsuarios = [];
  dataSource: MatTableDataSource<any>;
  respuesta: any = {
    code: 0,
    msg: '',
    detail: ''
  };

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private usuarios: UsuariosService) {
    this.dataSource = new MatTableDataSource(this.listaUsuarios);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getUsuarios();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getUsuarios() {
    this.listaUsuarios = [];
    this.usuarios.getAll().subscribe(resp => {
      this.respuesta = resp;
      this.respuesta.detail.forEach(usuario => {
        this.listaUsuarios.push({
          id: usuario._id,
          img: usuario.foto,
          nombre: usuario.nombre,
          apellidos: usuario.apPaterno + ' ' + usuario.apMaterno,
          tipo: this.getTipo(usuario.tipo), estatus: usuario.estatus
        });
      });
      this.dataSource = new MatTableDataSource(this.listaUsuarios);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, err => {
      console.log(err);
    });
  }
  getTipo(tipo) {
    // 1= Admin 2=Coord 3=Maestro 4= Alumno
    if (tipo == 1) {
      return 'Administrador';
    } else if (tipo == 2) {
      return 'Coordinador';
    } else if (tipo == 3) {
      return 'Maestro';
    } else {
      return 'Alumno';
    }
  }
  cambiarEstado(id, status) {
    this.usuarios.updateStatus(id, { estatus: status }).subscribe(resp => {

    }, err => {
      console.log(err);
    });

  }

  configUsuario(id) {
    console.log('Ir a usuario ' + id);
  }

  eliminarUsuario(id) {
    console.log('Eliminar usuario ' + id);
  }
}
