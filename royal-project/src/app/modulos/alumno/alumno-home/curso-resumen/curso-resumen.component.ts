import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { CursosService } from 'src/app/servicios/cursos.service'
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
declare let videojs: any;

@Component({
  selector: 'app-curso-resumen',
  templateUrl: './curso-resumen.component.html',
  styleUrls: ['./curso-resumen.component.scss']
})
export class CursoResumenComponent implements OnInit, OnDestroy, AfterViewInit {
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
    resumen: '',
    ruta: ''
  };
  avance = [];
  relacionados = [];

  player: any;

  constructor(private router: Router, private route: ActivatedRoute, private curso: CursosService, private usuarios: UsuariosService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.promedios = {
        uno: 0,
        dos: 0,
        tres: 0,
        cuatro: 0,
        cinco: 0,
      }
      this.ratingGeneral = 0;
      this.valoraciones = [];
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
      this.infoCurso.insignias = curso.detail[0].insignias;
      this.infoCurso.valoraciones = curso.detail[0].valoraciones;
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
      if (!this.infoCurso.alumnosInscritos.includes(parseInt(localStorage.getItem('userid')))) {
        this.router.navigate(['/curso', this.route.snapshot.params.id, 'vista']);
      }

      //Video
      this.player.src({ type: "video/mp4", src: this.infoCurso.videoPrincipal });
      this.player.poster(this.infoCurso.imagen);

      this.infoCurso.contenidoCurso = curso.detail[0].contenidoCurso;
      this.getAvance(localStorage.getItem('userid'));
      this.getInfoMaestro(curso.detail[0].idMaestro);
      this.getValoraciones();
      this.getRelacionados(curso.detail[0].subcategoria);
    });
  }
  getAvance(id) {
    this.avance = [];
    this.usuarios.getUser(id).subscribe((res: any) => {
      res.detail[0].cursoAlumno.forEach(curso => {
        if (curso.ruta == this.route.snapshot.params.id) {
          this.avance[0] = parseInt(curso.avance[0]);
          this.avance[1] = parseInt(curso.avance[2]);
          this.avance[2] = parseInt(curso.avance[4]);
        }
      });
    })
  }
  getInfoMaestro(id) {
    this.usuarios.getUser(id).subscribe((usuario: any) => {
      this.infoMaestro.foto = usuario.detail[0].foto;
      this.infoMaestro.nombreCompleto = usuario.detail[0].nombre + ' ' + usuario.detail[0].apPaterno + ' ' + usuario.detail[0].apMaterno;
      this.infoMaestro.resumen = usuario.detail[0].resumen;
      this.infoMaestro.ruta = usuario.detail[0].ruta;
    });
  }
  claseActual() {
    this.goClase(this.avance[0], this.avance[1], this.avance[2]);
  }
  goClase(unidad, subtema, clase) {
    this.router.navigate(['/curso/', this.route.snapshot.params.id, 'clase', unidad + 1, subtema + 1, clase + 1])
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
  getValoraciones() {
    this.infoCurso.valoraciones.forEach((valoracion, index) => {
      if (valoracion.idPersona == localStorage.getItem('userid')) {
        this.indexRev = index;
        this.review = valoracion.comentario;
        this.rating = valoracion.puntuacion;
      } else {
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
      }
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
    this.ratingGeneral = Math.round(puntaje / this.infoCurso.valoraciones.length);

  }
  subirReview() {
    if (this.indexRev != -1) {
      this.infoCurso.valoraciones.splice(this.indexRev, 1);
    }
    this.infoCurso.valoraciones.push({
      idPersona: localStorage.getItem('userid'),
      comentario: this.review,
      puntuacion: this.rating
    });
    this.curso.updateReview(this.route.snapshot.params.id, { valoraciones: this.infoCurso.valoraciones }).subscribe(res => {
      this.getInfoCurso(this.route.snapshot.params.id);
    });
  }
  getRelacionados(subcategoria) {
    this.curso.getCursos().subscribe((cursos: any) => {
      cursos.detail.forEach(curso => {
        if (curso.subcategoria == subcategoria && curso.ruta != this.route.snapshot.params.id) this.relacionados.push(curso);
      });

      if (this.relacionados.length > 5) this.relacionados = this.getRandom(this.relacionados, 5);
    });
  }
  getRandom(arr, n) {
    var result = new Array(n),
      len = arr.length,
      taken = new Array(len);
    if (n > len)
      throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
      var x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  }
}
