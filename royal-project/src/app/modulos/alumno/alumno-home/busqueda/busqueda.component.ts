import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CursosService } from 'src/app/servicios/cursos.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.scss']
})
export class BusquedaComponent implements OnInit {
  p: number = 1;
  listaCursos = [];

  constructor(private route: ActivatedRoute, private cursos: CursosService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.p = 1;
      this.listaCursos = [];
      this.getCursos(params.get('busqueda'));
    });
  }
  getCursos(busqueda) {
    this.listaCursos = [];
    const buscar = busqueda.replace(/-/g, ' ');
    this.cursos.getBusqueda(buscar).subscribe((res: any) => {
      res.detail.forEach(e => {
        e.valoraciones = this.getPromedio(e.valoraciones);
        this.listaCursos.push(e);
      });
    });
  }

  getPromedio(valoraciones) {
    var suma = 0;
    valoraciones.forEach(val => {
      suma = suma + val.puntuacion;
    });
    return Math.round(suma / valoraciones.length)
  }

  primeraMay(cad) {
    return cad.charAt(0).toUpperCase() + cad.slice(1);
  }

}
