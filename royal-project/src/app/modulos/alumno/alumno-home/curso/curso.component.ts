import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { CursosService } from 'src/app/servicios/cursos.service'
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { UsuariosService } from 'src/app/servicios/usuarios.service';


declare let videojs: any;

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.scss']
})

export class CursoComponent implements OnInit, OnDestroy, AfterViewInit {
  tempCarrito = localStorage.getItem('carrito');
  usuarioReg = localStorage.getItem('userid');
  promedios = {
    uno: 0,
    dos: 0,
    tres: 0,
    cuatro: 0,
    cinco: 0,
  }
  ratingGeneral = 0;
  rating = 5;
  review = '';
  indexRev = -1;
  valoraciones = [];
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
    alumnosInscritos: [],
    valoraciones: []
  };
  infoMaestro = {
    foto: '',
    nombreCompleto: '',
    resumen: ''
  };

  incluido = false;
  player: any;
  constructor(private route: ActivatedRoute, private router: Router, private curso: CursosService, private usuarios: UsuariosService) { }

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
    if (this.tempCarrito != null && this.tempCarrito.includes(this.route.snapshot.params.id)) {
      this.incluido = true;
    }
    this.curso.getCursoInfo(id).subscribe((curso: any) => {
      this.infoCurso.valoraciones = curso.detail[0].valoraciones;
      this.infoCurso.insignias = curso.detail[0].insignias;
      this.infoCurso.nombreCompleto = curso.detail[0].nombreCompleto;
      this.infoCurso.precio = curso.detail[0].precio;
      this.infoCurso.imagen = curso.detail[0].imagen;
      this.infoCurso.videoPrincipal = curso.detail[0].introduccionVideo;
      this.infoCurso.descripcion = curso.detail[0].descripcionCurso;
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
      if (this.infoCurso.alumnosInscritos.includes(parseInt(localStorage.getItem('userid')))) {
        this.router.navigate(['/curso', this.route.snapshot.params.id]);
      }

      //Video
      this.player.src({ type: "video/mp4", src: this.infoCurso.videoPrincipal });
      this.player.poster(this.infoCurso.imagen);

      this.infoCurso.contenidoCurso = curso.detail[0].contenidoCurso;
      this.getInfoMaestro(curso.detail[0].idMaestro);
      this.getValoraciones();
    });
  }
  getInfoMaestro(id) {
    this.usuarios.getUser(id).subscribe((usuario: any) => {
      this.infoMaestro.foto = usuario.detail[0].foto;
      this.infoMaestro.nombreCompleto = usuario.detail[0].nombre + ' ' + usuario.detail[0].apPaterno + ' ' + usuario.detail[0].apMaterno;
      this.infoMaestro.resumen = usuario.detail[0].resumen;
    });
  }

  agregarCurso() {
    if (localStorage.getItem('carrito') == null) {
      localStorage.setItem('carrito', this.route.snapshot.params.id + '|');
      this.incluido = true;
    } else {
      localStorage.setItem('carrito', this.tempCarrito + this.route.snapshot.params.id + '|');
      this.incluido = true;
    }

  }
  pagarCurso() {
    if (!this.incluido) {
      if (this.tempCarrito == null) this.tempCarrito = '';
      localStorage.setItem('carrito', this.tempCarrito + this.route.snapshot.params.id + '|');
    }
    this.router.navigate(['/mi-carrito']);

  }
  getValoraciones() {
    this.infoCurso.valoraciones.forEach(valoracion => {
      this.usuarios.getUser(valoracion.idPersona).subscribe((usuario: any) => {
        this.valoraciones.push({
          nombre: usuario.detail[0].nombre + ' ' + usuario.detail[0].apMaterno + ' ' + usuario.detail[0].apMaterno,
          cursos: usuario.detail[0].cursoAlumno.length,
          insignias: usuario.detail[0].insignias.length,
          foto: usuario.detail[0].foto,
          ruta: usuario.detail[0].ruta,
          comentario: valoracion.comentario,
          puntuacion: valoracion.puntuacion
        })
      })
      this.getPromedios();
    });
  }
  getPromedios() {
    this.promedios = {
      uno: 0,
      dos: 0,
      tres: 0,
      cuatro: 0,
      cinco: 0,
    }
    var puntaje = 0;
    this.infoCurso.valoraciones.forEach(valoracion => {
      puntaje = puntaje + valoracion.puntuacion;
      if (valoracion.puntuacion == 5) {
        this.promedios.cinco = this.promedios.cinco + 1;
      } else if (valoracion.puntuacion == 4) {
        this.promedios.cuatro = this.promedios.cuatro + 1;
      } else if (valoracion.puntuacion == 3) {
        this.promedios.tres = this.promedios.tres + 1;
      } else if (valoracion.puntuacion == 2) {
        this.promedios.dos = this.promedios.dos + 1;
      } else if (valoracion.puntuacion == 1) {
        this.promedios.uno = this.promedios.uno + 1;
      }
    });

    this.promedios.cinco = Math.round((this.promedios.cinco * 100) / this.infoCurso.valoraciones.length);
    this.promedios.cuatro = Math.round((this.promedios.cuatro * 100) / this.infoCurso.valoraciones.length);
    this.promedios.tres = Math.round((this.promedios.tres * 100) / this.infoCurso.valoraciones.length);
    this.promedios.dos = Math.round((this.promedios.dos * 100) / this.infoCurso.valoraciones.length);
    this.promedios.uno = Math.round((this.promedios.uno * 100) / this.infoCurso.valoraciones.length);
    console.log(this.promedios);
    this.ratingGeneral = Math.round(puntaje / this.infoCurso.valoraciones.length);

  }

}
