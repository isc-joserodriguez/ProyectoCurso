import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ComprasService } from 'src/app/servicios/compras.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { CursosService } from 'src/app/servicios/cursos.service';


@Component({
  selector: 'app-historial-compras',
  templateUrl: './historial-compras.component.html',
  styleUrls: ['./historial-compras.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class HistorialComprasComponent implements OnInit {
  // Compras completas
  listaCompras = [];
  colCompras: string[] = ['administrador', 'fecha', 'fechaLimite', 'importe', 'resto'];
  datosCompras: MatTableDataSource<any>;
  @ViewChild('paginasCompras', { read: MatPaginator }) paginasCompras: MatPaginator;
  @ViewChild(MatSort) ordenCompras: MatSort;

  expandedElement: any | null;

  constructor(private compras: ComprasService, private usuarios: UsuariosService, private cursos: CursosService) { }

  ngOnInit() {
    this.getCompras();
  }
  getCompras() {
    this.listaCompras = [];

    this.compras.getCompras().subscribe((compras: any) => {

      compras.detail.forEach(compra => {
        if (localStorage.getItem('userid') == compra.idPersona) {
          this.usuarios.getUser(compra.idAdmin).subscribe((infoAdmin: any) => {
            var detallesCompra = {
              administrador: (compra.idAdmin == -1) ? 'Adquirido por Sistema' : infoAdmin.detail[0].nombre + ' ' + infoAdmin.detail[0].apPaterno + ' ' + infoAdmin.detail[0].apMaterno,
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
            this.listaCompras.push(detallesCompra);
            this.datosCompras = new MatTableDataSource(this.listaCompras);
            this.datosCompras.paginator = this.paginasCompras;
            this.datosCompras.sort = this.ordenCompras;
          });
        }
      });
    });
  }
  fechaVencida(fecha) {
    return new Date(fecha).getTime() < Date.now();
  }

  applyFilter(filterValue: string) {
    this.datosCompras.filter = filterValue.trim().toLowerCase();
    if (this.datosCompras.paginator) {
      this.datosCompras.paginator.firstPage();
    }
  }
}