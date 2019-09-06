import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';


@Component({
  selector: 'app-historial-compras',
  templateUrl: './historial-compras.component.html',
  styleUrls: ['./historial-compras.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class HistorialComprasComponent {
  //variables tabla Historial
  dataSource = ELEMENT_DATA;
  columnsToDisplay = ['cursos', 'fecha', 'importe', 'estado'];
  expandedElement: PeriodicElement | null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
}

  export interface PeriodicElement {
    cursos: number;
    fecha: Date;
    importe: number;
    estado: String;
    description: string;
  }
  
  const ELEMENT_DATA: PeriodicElement[] = [
    {
      cursos: 2,
      fecha: new Date(),
      importe: 300,
      estado: 'Aceptado', 
      description: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
          atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`
    }
  ];
