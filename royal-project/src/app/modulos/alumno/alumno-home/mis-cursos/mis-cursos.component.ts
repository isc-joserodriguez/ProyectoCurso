import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { CursosService } from 'src/app/servicios/cursos.service';

@Component({
  selector: 'app-mis-cursos',
  templateUrl: './mis-cursos.component.html',
  styleUrls: ['./mis-cursos.component.scss']
})
export class MisCursosComponent implements OnInit {
  cursosTec = [];
  cursosIdiomas = [];

  constructor(private usuarios: UsuariosService, private cursos: CursosService) { }

  ngOnInit() {
    this.getCursos();
  }
  getCursos() {
    this.usuarios.getUser(localStorage.getItem('userid')).subscribe((usuario: any) => {
      usuario.detail[0].cursoAlumno.forEach(curso => {
        this.cursos.getCursoInfo(curso.ruta).subscribe((cursoInfo: any) => {
          cursoInfo.detail.forEach(cursoElement => {
            if (cursoElement.categoria == 'Tecnología') {
              this.cursosTec.push(cursoElement);
            } else {
              this.cursosIdiomas.push(cursoElement);
            }
          });
        });
      });
    });
  }
}
