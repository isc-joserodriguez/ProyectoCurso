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

  constructor(private cursos: CursosService, private route: ActivatedRoute, private router: Router, private usuarios: UsuariosService) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.getUsuario(this.route.snapshot.params.id);
  }
  getUsuario(id) {
    this.usuarios.getUser(id).subscribe((alumno: any) => {
      this.infoAlumno = alumno.detail[0];
      console.log(this.infoAlumno.cursoAlumno);
      this.cursos.getCursos().subscribe((cursos: any) => {
        this.infoAlumno.cursoAlumno.forEach(curso => {
          cursos.detail.forEach((listCursos: any) => {
            if (listCursos.ruta == curso.ruta) {
              if (listCursos.categoria == "Idiomas") {
                this.cursosId.push(listCursos);
              } else {
                this.cursosTec.push(listCursos);
              }
            }
          });
        });
      });
    });
  }

}
