import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { PromosService } from 'src/app/servicios/promos.service';

@Component({
  selector: 'app-admin-promos',
  templateUrl: './admin-promos.component.html',
  styleUrls: ['./admin-promos.component.scss']
})
export class AdminPromosComponent implements OnInit {
  displayedColumns: string[] = ['tipo', 'codigo', 'porcentaje', 'fechaInicio', 'fechaFin', 'usos', 'estado' ,'editar'];


  listaPromos = [];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private promos: PromosService, private router: Router) {
    this.dataSource = new MatTableDataSource(this.listaPromos);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getPromos();
  }

  getPromos() {
    this.listaPromos = [];
    this.promos.getPromos().subscribe((resp: any) => {
      this.listaPromos = resp.detail;
      this.dataSource = new MatTableDataSource(this.listaPromos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  editar(id) {
    this.router.navigate(['/admin/promos/editar', id]);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
