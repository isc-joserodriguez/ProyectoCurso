import { Component, OnInit } from '@angular/core';
import { CursosService } from 'src/app/servicios/cursos.service';

@Component({
  selector: 'app-maestro',
  templateUrl: './maestro.component.html',
  styleUrls: ['./maestro.component.scss']
})
export class MaestroComponent implements OnInit {
  listaCursos = [];
  nuevoCurso = false;

  respuesta: any = {
    code: 0,
    msg: '',
    detail: ''
  };
  constructor(private cursos: CursosService) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.getCursos(localStorage.getItem('userid'));
  }

  getCursos(id) {
    console.log(id);
    this.cursos.getCursosMaestro(id).subscribe(res => {
      this.respuesta = res;
      this.respuesta.detail.forEach(e => {
        if (e.estado == 2) {
          this.listaCursos.push({ nombre: e.nombreCorto, id: e._id, ruta: e.ruta });
          this.nuevoCurso = false;
        }
      });
    });

  }

}
