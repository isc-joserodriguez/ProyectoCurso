import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
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
  displayedColumns: string[] = ['img', 'nombre', 'apellidos', 'tipo', 'editar'];
  listaUsuarios = [];
  dataSource: MatTableDataSource<any>;
  respuesta: any = {
    code: 0,
    msg: '',
    detail: ''
  };

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private usuarios: UsuariosService, private router: Router) {
    this.dataSource = new MatTableDataSource(this.listaUsuarios);
  }

  ngOnInit() {
    window.scrollTo(0, 0);
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
          tipo: usuario.tipo
        });
      });
      this.dataSource = new MatTableDataSource(this.listaUsuarios);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, err => {
      console.log(err);
    });
  }
  cambiarEstado(id, tipo, cambio) {
    switch (cambio) {
      case 1:
        tipo[1].coord = !tipo[1].coord;
        break;
      case 2:
        tipo[2].maestro = !tipo[2].maestro;
        break;
      case 3:
        tipo[3].alumno = !tipo[3].alumno;
        break;
    }
    this.usuarios.updateTipo(id, { tipoNuevo: tipo }).subscribe(resp => {

    }, err => {
      console.log(err);
    });

  }

  configUsuario(id) {
    this.router.navigate(['/admin/usuario', id]);
  }
}
