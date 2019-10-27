import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { CursosService } from 'src/app/servicios/cursos.service';

@Component({
  selector: 'app-perfil-publico',
  templateUrl: './perfil-publico.component.html',
  styleUrls: ['./perfil-publico.component.scss']
})
export class PerfilPublicoComponent implements OnInit {
  infoAlumno = {
    nombre: "José Antonio",
    apMaterno: "Hernandez",
    apPaterno: "Rodriguez",
    resumen: " ",
    fb: " ",
    web: " ",
    yt: " ",
    in: " ",

    cursoAlumno: [],
    certificados: [],
    fechaNac: "2019-10-18T05:13:01.751Z",
    foto: "http://www.lorempixel.com/200/200",
    insignias: [],
    puntaje: 0,
  }

  cursosTec = [];
  cursosId = [];
  insignias = [];
  usrTotal = 0;
  nivel = 0;
  progreso = 0;
  porcentajeNivel = 0;


  constructor(private cursos: CursosService, private route: ActivatedRoute, private router: Router, private usuarios: UsuariosService) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.getUsuario(this.route.snapshot.params.id);
  }
  getUsuario(id) {
    this.usuarios.getAll().subscribe((alumnos: any) => {
      this.usrTotal = alumnos.detail.length;
    });
    this.usuarios.getUserByRute(id).subscribe((alumno: any) => {
      this.infoAlumno = alumno.detail[0];
      this.infoAlumno.cursoAlumno.forEach(curso => {
        this.cursos.getCursoInfo(curso.ruta).subscribe((cursoInfo: any) => {
          if (cursoInfo.detail[0].categoria == 'Tecnología') {
            this.cursosTec.push(cursoInfo.detail[0]);
          } else {
            this.cursosId.push(cursoInfo.detail[0]);
          }
          this.infoAlumno.insignias.forEach(insignia => {
            if (insignia.ruta == cursoInfo.detail[0].ruta) {
              var temp = cursoInfo.detail[0].insignias[insignia.idInsignia]
              temp.otorgadas = Math.round((temp.otorgadas * 100) / this.usrTotal);
              this.insignias.push(temp);
            }
          });
        });
      });

      this.progreso = this.infoAlumno.puntaje % 1000;
      this.nivel = ((this.infoAlumno.puntaje - this.progreso) / 1000) + 1;
      this.porcentajeNivel=Math.round((this.progreso * 100) / 1000);
    });
  }
}
