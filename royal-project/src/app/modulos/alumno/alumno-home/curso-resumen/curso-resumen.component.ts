import { Component, OnInit, OnDestroy } from '@angular/core';
import { CursosService } from 'src/app/servicios/cursos.service'
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { StarRatingComponent } from 'ng-starrating';
declare let videojs: any;

@Component({
  selector: 'app-curso-resumen',
  templateUrl: './curso-resumen.component.html',
  styleUrls: ['./curso-resumen.component.scss']
})
export class CursoResumenComponent implements OnInit, OnDestroy {
  infoCurso: any = {
    idMaestro: 0,
    nombreCompleto: '',
    precio: 0,
    videoPrincipal: '',
    descripcion: '',
    valoracion: 0,
    inscritos: 0,
    objetivos: [],
    contenidoCurso: [{}],
    imagen: '',
    alumnosInscritos: []
  };
  infoMaestro = {
    foto: '',
    nombreCompleto: '',
    resumen: ''
  };
  avance = [];

  constructor(private router: Router, private route: ActivatedRoute, private curso: CursosService, private usuarios: UsuariosService) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.getInfoCurso(this.route.snapshot.params.id);
  }
  ngOnDestroy(): void {
    var oldPlayer = document.getElementById('videoId');
    videojs(oldPlayer).dispose();
  }
  getInfoCurso(id) {
    this.curso.getCursoInfo(id).subscribe((curso: any) => {
      this.infoCurso.nombreCompleto = curso.detail[0].nombreCompleto;
      this.infoCurso.precio = curso.detail[0].precio;
      this.infoCurso.imagen = curso.detail[0].imagen;
      this.infoCurso.videoPrincipal = curso.detail[0].introduccionVideo;
      this.infoCurso.descripcion = curso.detail[0].descripcionCurso;
      this.infoCurso.valoracion = 5;
      this.infoCurso.inscritos = 5;
      this.infoCurso.objetivos = curso.detail[0].objetivos;
      this.infoCurso.objetivos = [];
      curso.detail[0].objetivos.forEach(elemento => {
        this.infoCurso.objetivos.push(elemento.objetivo);
      });
      this.infoCurso.alumnosInscritos = curso.detail[0].alumnosInscritos;
      this.infoCurso.alumnosInscritos = [];
      curso.detail[0].alumnosInscritos.forEach(elemento => {
        this.infoCurso.alumnosInscritos.push(elemento.idAlumno);
      });
      if (!this.infoCurso.alumnosInscritos.includes(parseInt(localStorage.getItem('userid')))) {
        this.router.navigate(['/curso', this.route.snapshot.params.id, 'vista']);
      }
      videojs("videoId", {
        sources: [{
          src: this.infoCurso.videoPrincipal,
          type: 'video/mp4'
        }]
      }, function () {
        // Player (this) is initialized and ready.
      });
      this.infoCurso.contenidoCurso = curso.detail[0].contenidoCurso;
      this.getAvance(localStorage.getItem('userid'));
      this.getInfoMaestro(curso.detail[0].idMaestro);
    });
  }
  getAvance(id) {
    this.avance = [];
    this.usuarios.getUser(id).subscribe((res: any) => {
      res.detail[0].cursoAlumno.forEach(curso => {
        this.avance[0] = parseInt(curso.avance[0]);
        this.avance[1] = parseInt(curso.avance[2]);
        this.avance[2] = parseInt(curso.avance[4]);
      });
    })
  }
  getInfoMaestro(id) {
    this.usuarios.getUser(id).subscribe((usuario: any) => {
      this.infoMaestro.foto = usuario.detail[0].foto;
      this.infoMaestro.nombreCompleto = usuario.detail[0].nombre + ' ' + usuario.detail[0].apPaterno + ' ' + usuario.detail[0].apMaterno;
      this.infoMaestro.resumen = usuario.detail[0].resumen;
    });
  }
  claseActual() {
    this.goClase(this.avance[0], this.avance[1], this.avance[2]);
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
