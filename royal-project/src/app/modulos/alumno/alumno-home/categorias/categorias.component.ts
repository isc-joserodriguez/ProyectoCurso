import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CursosService } from 'src/app/servicios/cursos.service';


@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {
  categoria = '';
  p: number = 1;
  listaCursos = [];
  subcategorias = [];

  constructor(private route: ActivatedRoute, private cursos: CursosService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      window.scrollTo(0, 0);
      this.categoria = '';
      this.p = 1;
      this.listaCursos = [];
      this.subcategorias = [];
      this.categoria = this.primeraMay(params.get('categoria'));
      this.getCursos(params.get('categoria'));
    });

  }
  onScroll() {
    console.log('scrolled!!');
  }
  getCursos(cat) {
    this.cursos.getSubcategorias().subscribe((res: any) => {
      res.detail.forEach(e => {
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
