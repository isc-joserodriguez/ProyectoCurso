import { Component, OnInit } from '@angular/core';
import { DiarioService } from 'src/app/servicios/diario.service';

@Component({
  selector: 'app-diario-propias',
  templateUrl: './diario-propias.component.html',
  styleUrls: ['./diario-propias.component.scss']
})
export class DiarioPropiasComponent implements OnInit {
  entradas = [];
  iduser = localStorage.getItem('userid') == null;
  constructor(private diario: DiarioService) { }
  ngOnInit() {
    this.getEntradas();
  }
  getEntradas() {
    this.diario.getEntradas().subscribe((entradas: any) => {
      entradas.detail.forEach(entrada => {
        if (entrada.idPersona == localStorage.getItem('userid')) {
          if (!entrada.reportado) this.entradas.push(entrada);
        }
      });;
    });
  }
}
