import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursosService } from 'src/app/servicios/cursos.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {

  respuesta: any = {
    code: 0,
    msg: '',
    detail: ''
  };

  listaCursos = [];

  constructor(private route: ActivatedRoute, private cursos: CursosService) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.getCursos(this.route.snapshot.params.categoria);
  }
  getCursos(cat) {
    this.cursos.getSubcategorias().subscribe(res => {
      this.respuesta = res;
      this.respuesta.detail.forEach(e => {
        console.log(e);
        if (e.categoria == this.primeraMay(cat)) {
          this.listaCursos.push(e);
        }
      });
    });
  }

  primeraMay(cad) {
    return cad.charAt(0).toUpperCase() + cad.slice(1);
  }

}
