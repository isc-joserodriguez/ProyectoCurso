import { Component, OnInit, ViewChild } from '@angular/core';
import { ComprasService } from 'src/app/servicios/compras.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

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
  ],
})
export class AdminPagosComponent implements OnInit {

  //idAdmin idPersona importe fecha fechaLimite abonos: [{ idAdmin importe fecha }] resto estado cursos: [ ruta }]
  pendientes = false;
  //Compras pendientes
  listaPendientes = [];
  displayedColumns: string[] = ['administrador', 'persona', 'importe', 'fecha', 'fechaLimite', 'resto', 'detalles'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // Compras completas
  listaCompras = [];
  colCompras: string[] = ['administrador', 'persona', 'importe', 'fecha', 'detalles'];
  datosCompras: MatTableDataSource<any>;
  @ViewChild('paginasCompras', { read: MatPaginator }) paginasCompras: MatPaginator;
  @ViewChild(MatSort) ordenCompras: MatSort;

  constructor(private compras: ComprasService, private usuarios: UsuariosService) { }

  ngOnInit() {
    this.getCompras();
  }
  getCompras() {
    this.listaPendientes = [];
    this.listaCompras = [];

    this.compras.getCompras().subscribe((compras: any) => {
      compras.detail.forEach(compra => {
        console.log(compra);
        this.usuarios.getUser(compra.idAdmin).subscribe((infoAdmin: any) => {
          this.usuarios.getUser(compra.idPersona).subscribe((infoAlumno: any) => {
            var detallesCompra = {
              administrador: infoAdmin.detail[0].nombre + ' ' + infoAdmin.detail[0].apPaterno + ' ' + infoAdmin.detail[0].apMaterno,
              persona: infoAlumno.detail[0].nombre + ' ' + infoAlumno.detail[0].apPaterno + ' ' + infoAlumno.detail[0].apMaterno,
              importe: compra.importe,
              fecha: compra.fecha,
              fechaLimite: compra.fechaLimite,
              resto: compra.resto
            }
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

}
