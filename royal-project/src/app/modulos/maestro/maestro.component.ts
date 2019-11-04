import { Component, OnInit } from '@angular/core';
import { CursosService } from 'src/app/servicios/cursos.service';

@Component({
  selector: 'app-maestro',
  templateUrl: './maestro.component.html',
  styleUrls: ['./maestro.component.scss']
})
export class MaestroComponent implements OnInit {
  listaCursos = [];
  nuevoCurso = true;

  constructor(private cursos: CursosService) { }

  ngOnInit() {
    this.getCursos(localStorage.getItem('userid'));
  }

  getCursos(id) {
    this.cursos.getCursosMaestro(id).subscribe((res: any) => {
      res.detail.forEach(e => {
        if (e.estado == 2) {
          this.listaCursos.push({ nombre: e.nombreCorto, id: e._id, ruta: e.ruta });
          this.nuevoCurso = false;
        }
      });
    });

  }

}
