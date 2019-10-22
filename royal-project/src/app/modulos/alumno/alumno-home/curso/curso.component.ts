import { Component, OnInit, OnDestroy } from '@angular/core';
import { CursosService } from 'src/app/servicios/cursos.service'
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from 'src/app/servicios/usuarios.service';


declare let videojs: any;

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.scss']
})

export class CursoComponent implements OnInit, OnDestroy {
  respuesta: any = {
    code: 0,
    msg: '',
    detail: ''
  };
  infoCurso = {
    idMaestro: 0,
    nombreCompleto: '',
    precio: 0,
    videoPrincipal: '',
    descripcion: '',
    valoracion: 0,
    inscritos: 0,
    objetivos: [],
    contenidoCurso: [{}],
    imagen: ''
  };
  infoMaestro = {
    foto: '',
    nombreCompleto: '',
    resumen: ''
  };

  constructor(private route: ActivatedRoute, private curso: CursosService, private usuarios: UsuariosService) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.getInfoCurso(this.route.snapshot.params.id);
  }
  ngOnDestroy(): void {
    var oldPlayer = document.getElementById('videoId');
    videojs(oldPlayer).dispose();
  }
  getInfoCurso(id) {
    this.curso.getCursoInfo(id).subscribe(curso => {
      // Pendientes
      console.log(curso);
      this.respuesta = curso;
      this.infoCurso.nombreCompleto = this.respuesta.detail[0].nombreCompleto;
      this.infoCurso.precio = this.respuesta.detail[0].precio;
      this.infoCurso.imagen = this.respuesta.detail[0].imagen;
      this.infoCurso.videoPrincipal = this.respuesta.detail[0].introduccionVideo;
      this.infoCurso.descripcion = this.respuesta.detail[0].descripcionCurso;
      this.infoCurso.valoracion = 5;
      this.infoCurso.inscritos = 5;
      this.infoCurso.objetivos = this.respuesta.detail[0].objetivos;
      this.infoCurso.objetivos = [];
      this.respuesta.detail[0].objetivos.forEach(elemento => {
        this.infoCurso.objetivos.push(elemento.objetivo);
      });
      videojs("videoId", {
        sources: [{
          src: this.infoCurso.videoPrincipal,
          type: 'video/mp4'
        }]
      }, function () {
        // Player (this) is initialized and ready.
      });
      this.infoCurso.contenidoCurso = this.respuesta.detail[0].contenidoCurso;
      this.getInfoMaestro(this.respuesta.detail[0].idMaestro);
    });
  }
  getInfoMaestro(id) {
    this.usuarios.getUser(id).subscribe(usuario => {
      this.respuesta = usuario;
      this.infoMaestro.foto = this.respuesta.detail[0].foto;
      this.infoMaestro.nombreCompleto = this.respuesta.detail[0].nombre + ' ' + this.respuesta.detail[0].apPaterno + ' ' + this.respuesta.detail[0].apMaterno;
      this.infoMaestro.resumen = this.respuesta.detail[0].resumen;
    });
  }

  
}
