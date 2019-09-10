import { Component, OnInit } from '@angular/core';
import { CursosService } from '../../servicios/cursos.service';

@Component({
  selector: 'app-maestro',
  templateUrl: './maestro.component.html',
  styleUrls: ['./maestro.component.scss']
})
export class MaestroComponent implements OnInit {
  listaCursos = [];

  respuesta: any = {
    code: 0,
    msg: '',
    detail: ''
  };
  constructor(private cursos: CursosService) { }

  ngOnInit() {
    this.getCursos(localStorage.getItem('userid'));
  }

  getCursos(id) {
    this.cursos.getCursosMaestro(id).subscribe(res => {
      this.respuesta = res;
      this.respuesta.detail.forEach(e => {
        if (e.estado == 2) {
          this.listaCursos.push({ nombre: e.nombreCorto, id: e._id });
        }
      });
    });

  }

}
