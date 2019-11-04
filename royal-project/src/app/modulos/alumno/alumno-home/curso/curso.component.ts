import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { CursosService } from 'src/app/servicios/cursos.service'
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UsuariosService } from 'src/app/servicios/usuarios.service';


declare let videojs: any;

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.scss']
})

export class CursoComponent implements OnInit, OnDestroy, AfterViewInit {
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
    imagen: '',
    alumnosInscritos: []
  };
  infoMaestro = {
    foto: '',
    nombreCompleto: '',
    resumen: ''
  };

  comprado = false;
  player: any;
  constructor(private route: ActivatedRoute, private curso: CursosService, private usuarios: UsuariosService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.getInfoCurso(params.get('id'));
    });
  }
  ngOnDestroy(): void {
    var oldPlayer = document.getElementById('videoId');
    videojs(oldPlayer).dispose();
  }
  ngAfterViewInit(): void {
    this.player = videojs("videoId");
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
      this.comprado = this.infoCurso.alumnosInscritos.includes(parseInt(localStorage.getItem('userid')));

      //Video
      this.player.src({ type: "video/mp4", src: this.infoCurso.videoPrincipal });
      this.player.poster(this.infoCurso.imagen);

      this.infoCurso.contenidoCurso = curso.detail[0].contenidoCurso;
      this.getInfoMaestro(curso.detail[0].idMaestro);
    });
  }
  getInfoMaestro(id) {
    this.usuarios.getUser(id).subscribe((usuario: any) => {
      this.infoMaestro.foto = usuario.detail[0].foto;
      this.infoMaestro.nombreCompleto = usuario.detail[0].nombre + ' ' + usuario.detail[0].apPaterno + ' ' + usuario.detail[0].apMaterno;
      this.infoMaestro.resumen = usuario.detail[0].resumen;
    });
  }


}
