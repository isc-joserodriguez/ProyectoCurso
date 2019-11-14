import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CursosService } from 'src/app/servicios/cursos.service';

@Component({
  selector: 'app-subcategoria',
  templateUrl: './subcategoria.component.html',
  styleUrls: ['./subcategoria.component.scss']
})
export class SubcategoriaComponent implements OnInit {
  p: number = 1;
  listaCursos = [];

  constructor(private route: ActivatedRoute, private cursos: CursosService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.p = 1;
      this.listaCursos = [];
      this.getCursos(params.get('subcategoria'));
    });
  }
  getCursos(cat) {
    this.cursos.getSubcategorias().subscribe((res: any) => {
      res.detail.forEach(e => {
        if (e.subcategoria == this.primeraMay(cat)) {
          this.listaCursos.push(e);
        }
      });
    });
  }

  primeraMay(cad) {
    return cad.charAt(0).toUpperCase() + cad.slice(1);
  }

}
