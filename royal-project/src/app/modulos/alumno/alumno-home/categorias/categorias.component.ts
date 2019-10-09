import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursosService } from 'src/app/servicios/cursos.service';


@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {
  categoria = '';

  respuesta: any = {
    code: 0,
    msg: '',
    detail: ''
  };

  listaCursos = [];
  subcategorias=[];

  constructor(private route: ActivatedRoute, private cursos: CursosService) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.categoria = this.primeraMay(this.route.snapshot.params.categoria);
    this.getCursos(this.route.snapshot.params.categoria);
  }
  onScroll() {
    console.log('scrolled!!');
  }
  getCursos(cat) {
    this.cursos.getSubcategorias().subscribe(res => {
      this.respuesta = res;
      this.respuesta.detail.forEach(e => {
        if (e.categoria == this.primeraMay(cat)) {
          this.listaCursos.push(e);
          this.subcategorias.push(e.subcategoria)
        }
      });
      var a = [];
      new Set(this.subcategorias).forEach(e => {
        a.push(e);
      });
      this.subcategorias = a;
    });
  }

  primeraMay(cad) {
    return cad.charAt(0).toUpperCase() + cad.slice(1);
  }

}
