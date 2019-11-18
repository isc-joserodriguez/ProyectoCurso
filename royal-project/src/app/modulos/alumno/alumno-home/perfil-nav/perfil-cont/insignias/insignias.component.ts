import { Component, OnInit } from '@angular/core';
import { CursosService } from 'src/app/servicios/cursos.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-insignias',
  templateUrl: './insignias.component.html',
  styleUrls: ['./insignias.component.scss']
})
export class InsigniasComponent implements OnInit {

  insignias = [];

  constructor(private cursos: CursosService, private usuarios: UsuariosService) { }

  ngOnInit() {
    this.getUsuario(localStorage.getItem('userid'));
  }
  getUsuario(id) {
    this.usuarios.getUser(id).subscribe((alumno: any) => {
      alumno.detail[0].cursoAlumno.forEach(curso => {
        this.cursos.getCursoInfo(curso.ruta).subscribe((cursoInfo: any) => {
          alumno.detail[0].insignias.forEach(insignia => {
            if (insignia.ruta == cursoInfo.detail[0].ruta) {
              var temp = cursoInfo.detail[0].insignias[insignia.idInsignia]
              temp.otorgadas = Math.round((temp.otorgadas * 100) / cursoInfo.detail[0].alumnosInscritos.length);
              this.insignias.push(temp);
            }
          });
        });
      });
    });
  }

}
