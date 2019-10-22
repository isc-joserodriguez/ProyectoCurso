import { Component, OnInit } from '@angular/core';
import { CursosService } from 'src/app/servicios/cursos.service'
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-curso-clase-info',
  templateUrl: './curso-clase-info.component.html',
  styleUrls: ['./curso-clase-info.component.scss']
})
export class CursoClaseInfoComponent implements OnInit {
  respuesta: any = {
    code: 0,
    msg: '',
    detail: ''
  };
  infoCurso: any = {
    contenidoCurso: [{}],
    imagen: '',
    alumnosInscritos: []
  };
  infoClase: any = {
    clase: '',
    tipoPlantilla: 0,
    video: '',
    texto: '',
    recursos: { activo: false, urls: [] },
    tarea: { activo: false, envios: [] },
    comentarios: []
  };
  avance = [];
  cursosAlumno: any = [];

  constructor(private router: Router, private route: ActivatedRoute, private curso: CursosService, private usuarios: UsuariosService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      window.scrollTo(0, 0);
      this.getInfoClase(params.get('id'));
    });
  }
  getInfoClase(id) {
    this.curso.getCursoInfo(id).subscribe(curso => {
      this.respuesta = curso;
      this.infoCurso._id = this.respuesta.detail[0]._id;
      this.infoCurso.imagen = this.respuesta.detail[0].imagen;
      this.infoCurso.alumnosInscritos = this.respuesta.detail[0].alumnosInscritos;
      this.infoCurso.alumnosInscritos = [];
      this.respuesta.detail[0].alumnosInscritos.forEach(elemento => {
        this.infoCurso.alumnosInscritos.push(elemento.idAlumno);
      });
      this.infoCurso.contenidoCurso = this.respuesta.detail[0].contenidoCurso;
      if (!this.infoCurso.alumnosInscritos.includes(parseInt(localStorage.getItem('userid')))) {
        this.router.navigate(['/curso', this.route.snapshot.params.id, 'vista']);
      }
      this.infoClase = this.infoCurso.contenidoCurso[this.route.snapshot.params.unidad - 1].subtemas[this.route.snapshot.params.subtema - 1].clases[this.route.snapshot.params.clase - 1];
      console.log(this.infoClase);
      this.setAvance(localStorage.getItem('userid'));
    });
  }
  setAvance(id) {
    this.avance = [parseInt(this.route.snapshot.params.unidad) - 1, parseInt(this.route.snapshot.params.subtema) - 1, parseInt(this.route.snapshot.params.clase) - 1];
    this.usuarios.getUser(id).subscribe(res => {
      this.respuesta = res;
      this.respuesta.detail[0].cursoAlumno.forEach(element => {
        if (element.idCurso == this.infoCurso._id) {
          element.avance = this.avance[0] + '-' + this.avance[1] + '-' + this.avance[2]
        }
        this.cursosAlumno.push(element);
      });
      this.usuarios.updateAvance(id,this.cursosAlumno).subscribe(res=>{
      });
    });
  }
  goClase(unidad, subtema, clase) {
    if (this.infoCurso.contenidoCurso[unidad].subtemas[subtema].clases[clase].tipoPlantilla == 0) {
      this.router.navigate(['/curso/', this.route.snapshot.params.id, 'clase', unidad + 1, subtema + 1, clase + 1])
    } else {
      this.router.navigate(['/curso/', this.route.snapshot.params.id, 'info', unidad + 1, subtema + 1, clase + 1])
    }
  }
  claseSiguiente(infoAvance) {
    if (infoAvance[0] <= this.infoCurso.contenidoCurso.length - 1) {
      if (infoAvance[1] <= this.infoCurso.contenidoCurso[infoAvance[0]].subtemas.length - 1) {
        if (infoAvance[2] < this.infoCurso.contenidoCurso[infoAvance[0]].subtemas[infoAvance[1]].clases.length - 1) {
          infoAvance[2] = infoAvance[2] + 1;
          this.goClase(infoAvance[0], infoAvance[1], infoAvance[2]);
        } else {
          infoAvance[1] = infoAvance[1] + 1;
          infoAvance[2] = 0;
          if (infoAvance[1] > this.infoCurso.contenidoCurso[infoAvance[0]].subtemas.length - 1) {
            infoAvance[0] = infoAvance[0] + 1;
            infoAvance[1] = 0;
            infoAvance[2] = 0;
            if (infoAvance[0] > this.infoCurso.contenidoCurso.length - 1) {
              console.log('reiniciamos');
            }
          }
          this.goClase(infoAvance[0], infoAvance[1], infoAvance[2]);
        }
      }
    }

  }

}
