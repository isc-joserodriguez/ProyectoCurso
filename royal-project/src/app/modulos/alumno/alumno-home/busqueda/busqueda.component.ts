import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursosService } from 'src/app/servicios/cursos.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.scss']
})
export class BusquedaComponent implements OnInit {
  p : number = 1;

  respuesta: any = {
    code: 0,
    msg: '',
    detail: ''
  };

  listaCursos = [0];

  constructor(private route: ActivatedRoute, private cursos: CursosService) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.getCursos(this.route.snapshot.params.busqueda);
  }
  getCursos(busqueda) {
    this.listaCursos = [];
    const buscar = busqueda.replace(/-/g, ' ');
    this.cursos.getBusqueda(buscar).subscribe(res => {
      this.respuesta = res;
      this.respuesta.detail.forEach(e => {
        this.listaCursos.push(e);
      });
      
    });
  }

  primeraMay(cad) {
    return cad.charAt(0).toUpperCase() + cad.slice(1);
  }

}
