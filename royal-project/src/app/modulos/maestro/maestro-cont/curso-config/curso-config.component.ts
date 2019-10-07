import { Component, OnInit, OnDestroy } from '@angular/core';
import { CursosService } from '../../../../servicios/cursos.service';
import { ActivatedRoute } from '@angular/router';
declare let videojs: any;

@Component({
  selector: 'app-curso-config',
  templateUrl: './curso-config.component.html',
  styleUrls: ['./curso-config.component.scss']
})
export class CursoConfigComponent implements OnInit, OnDestroy {
  respuesta: any = {
    code: 0,
    msg: '',
    detail: []
  }
  infoCurso = {
    nombreCompleto: '',
    precio: 0,
    introduccionVideo: '',
    imagen: '',
    descripcion: '',
    valoracion: 0,
    inscritos: 0,
    objetivos: [],
    contenidoCurso: [{}],
    notas: ''
  };

  constructor(private cursos: CursosService, private route: ActivatedRoute) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.getCurso(this.route.snapshot.params.id);
  }

  ngOnDestroy(): void {
    var oldPlayer = document.getElementById('videoId');
    videojs(oldPlayer).dispose();
  }

  getCurso(ruta) {
    this.cursos.getCursoInfo(ruta).subscribe(curso => {
      this.respuesta = curso;
      this.infoCurso = this.respuesta.detail[0];
      videojs("videoId", {
        sources: [{
          src: this.infoCurso.introduccionVideo,
          type: 'video/mp4'
        }]
      }, function () {
        // Player (this) is initialized and ready.
      });
      console.log(this.infoCurso);
    });
  }

}
