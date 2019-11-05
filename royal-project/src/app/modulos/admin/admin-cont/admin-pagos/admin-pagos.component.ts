import { Component, OnInit, ViewChild } from '@angular/core';
import { ComprasService } from 'src/app/servicios/compras.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CursosService } from 'src/app/servicios/cursos.service';

@Component({
  selector: 'app-admin-pagos',
  templateUrl: './admin-pagos.component.html',
  styleUrls: ['./admin-pagos.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class AdminPagosComponent implements OnInit {
  //idAdmin idPersona importe fecha fechaLimite abonos: [{ idAdmin importe fecha }] resto estado cursos: [ ruta }]
  pendientes = false;
  cantAbono = 0;
  //Compras pendientes
  listaPendientes = [];
  displayedColumns: string[] = ['administrador', 'persona', 'fecha', 'fechaLimite', 'importe', 'resto'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // Compras completas
  listaCompras = [];
  colCompras: string[] = ['administrador', 'persona', 'fecha', 'importe'];
  datosCompras: MatTableDataSource<any>;
  @ViewChild('paginasCompras', { read: MatPaginator }) paginasCompras: MatPaginator;
  @ViewChild(MatSort) ordenCompras: MatSort;

  expandedElement: any | null;

  constructor(private compras: ComprasService, private usuarios: UsuariosService, private cursos: CursosService) { }

  ngOnInit() {
    this.getCompras();
  }
  getCompras() {
    this.listaPendientes = [];
    this.listaCompras = [];

    this.compras.getCompras().subscribe((compras: any) => {
      compras.detail.forEach(compra => {
        this.usuarios.getUser(compra.idAdmin).subscribe((infoAdmin: any) => {
          this.usuarios.getUser(compra.idPersona).subscribe((infoAlumno: any) => {
            var detallesCompra = {
              administrador: infoAdmin.detail[0].nombre + ' ' + infoAdmin.detail[0].apPaterno + ' ' + infoAdmin.detail[0].apMaterno,
              persona: infoAlumno.detail[0].nombre + ' ' + infoAlumno.detail[0].apPaterno + ' ' + infoAlumno.detail[0].apMaterno,
              importe: compra.importe,
              fecha: compra.fecha,
              fechaLimite: compra.fechaLimite,
              resto: compra.resto,
              abonos: [],
              cursos: [],
              id: compra._id
            }
            compra.abonos.forEach(abono => {
              this.usuarios.getUser(abono.idAdmin).subscribe((infoAdminAbono: any) => {
                detallesCompra.abonos.push({
                  administrador: infoAdminAbono.detail[0].nombre + ' ' + infoAdminAbono.detail[0].apPaterno + ' ' + infoAdminAbono.detail[0].apMaterno,
                  fecha: abono.fecha,
                  importe: abono.importe
                });
              });
            });
            compra.cursos.forEach(curso => {
              this.cursos.getCursoInfo(curso.ruta).subscribe((cursoInfo: any) => {
                detallesCompra.cursos.push({
                  nombre: cursoInfo.detail[0].nombreCompleto,
                  imagen: cursoInfo.detail[0].imagen,
                  precio: cursoInfo.detail[0].precio,
                  categoria: cursoInfo.detail[0].categoria,
                  descripcionCurso: cursoInfo.detail[0].descripcionCurso
                });
              });
            });
            if (compra.estado == 0) {
              this.listaCompras.push(detallesCompra);
            } else {
              this.listaPendientes.push(detallesCompra);
            }
            this.pendientes = this.listaPendientes.length != 0;
            this.dataSource = new MatTableDataSource(this.listaPendientes);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.datosCompras = new MatTableDataSource(this.listaCompras);
            this.datosCompras.paginator = this.paginasCompras;
            this.datosCompras.sort = this.ordenCompras;
          });
        });
      });
    });
  }

  inicializar() {
    this.cantAbono = 0;
  }

  guardarAbono(id) {
    this.compras.getCompra(id).subscribe((compra: any) => {
      compra.detail[0].abonos.push({
        idAdmin: localStorage.getItem('userid'),
        importe: this.cantAbono
      });
      compra.detail[0].resto = compra.detail[0].resto - this.cantAbono;
      if (compra.detail[0].resto == 0) compra.detail[0].estado = 0;
      this.compras.guardarAbono(id, { abonos: compra.detail[0].abonos, resto: compra.detail[0].resto, estado: compra.detail[0].estado }).subscribe(res => {
        this.getCompras();
      });
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  applyFilter2(filterValue: string) {
    this.datosCompras.filter = filterValue.trim().toLowerCase();
    if (this.datosCompras.paginator) {
      this.datosCompras.paginator.firstPage();
    }
  }

}
