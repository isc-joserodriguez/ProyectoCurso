import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { CursosService } from 'src/app/servicios/cursos.service';
import { FirebaseService } from 'src/app/servicios/firebase.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
declare let videojs: any;

@Component({
  selector: 'app-curso-config',
  templateUrl: './curso-config.component.html',
  styleUrls: ['./curso-config.component.scss']
})
export class CursoConfigComponent implements OnInit, OnDestroy, AfterViewInit {
  //Rating
  ratingGeneral = 0;

  valoraciones = [];

  promedios = {
    uno: 0,
    dos: 0,
    tres: 0,
    cuatro: 0,
    cinco: 0,
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
    notas: '',
    valoraciones: []
  };

  viejaFoto = ''
  finalizadoFoto = true;
  cambiaFoto = false;
  mensajeFoto = 'No hay foto';
  datosFormularioFoto = new FormData();
  nombreFoto = '';
  URLFoto = '';
  porcentajeFoto = 0;
  fotoForm: FormGroup;

  viejoVideo = ''
  finalizadoVideo = true;
  cambiaVideo = false;
  mensajeVideo = 'No hay video';
  datosFormularioVideo = new FormData();
  nombreVideo = '';
  URLVideo = '';
  porcentajeVideo = 0;
  videoForm: FormGroup;

  mostrarFormObjetivo = false;
  objetivosForm: FormGroup;
  editado = 0;
  editar = false;

  player: any;

  constructor(private usuarios: UsuariosService, private router: Router, private firebase: FirebaseService, private cursos: CursosService, private route: ActivatedRoute, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.fotoForm = this.formBuilder.group({
        foto: new FormControl(null, Validators.required)
      });
      this.videoForm = this.formBuilder.group({
        video: new FormControl(null, Validators.required)
      });
      this.objetivosForm = this.formBuilder.group({
        objetivo: ['', Validators.required]
      });
      this.getCurso(params.get('id'));
    });
  }

  ngOnDestroy(): void {
    var oldPlayer = document.getElementById('videoId');
    videojs(oldPlayer).dispose();
  }

  ngAfterViewInit(): void {
    this.player = videojs("videoId");
  }

  getCurso(ruta) {
    this.cursos.getCursoInfo(ruta).subscribe((curso: any) => {
      this.infoCurso = curso.detail[0];
      //Video
      this.player.src({ type: "video/mp4", src: this.infoCurso.introduccionVideo });
      this.player.poster(this.infoCurso.imagen);
      this.getValoraciones();
    });
  }

  public seleccionarFoto(event) {
    this.cambiaFoto = true;
    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.mensajeFoto = `${event.target.files[i].name}`.substring(0, 12) + '...';
        this.nombreFoto = event.target.files[i].name;
        this.datosFormularioFoto.delete('archivo');
        this.datosFormularioFoto.append('archivo', event.target.files[i], event.target.files[i].name);
      }
    } else {
      this.mensajeFoto = 'No hay foto';
    }
  }
  public seleccionarVideo(event) {
    this.cambiaVideo = true;
    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.mensajeVideo = `${event.target.files[i].name}`.substring(0, 9);
        this.nombreVideo = event.target.files[i].name;
        this.datosFormularioVideo.delete('archivo');
        this.datosFormularioVideo.append('archivo', event.target.files[i], event.target.files[i].name);
      }
    } else {
      this.mensajeVideo = 'No hay video';
    }
  }

  public subirFoto() {
    this.viejaFoto = this.infoCurso.imagen;
    var datos = {
      imagen: this.infoCurso.imagen,
      introduccionVideo: this.infoCurso.introduccionVideo
    }
    this.finalizadoFoto = false;
    this.porcentajeFoto = 0;
    const archivo = this.datosFormularioFoto.get('archivo');
    const referencia = this.firebase.referenciaCloudStorage('usuario/' +
      localStorage.getItem('userid') + '/curso/' + this.route.snapshot.params.id + '/imagen/' + this.nombreFoto);
    const tarea = this.firebase.tareaCloudStorage('usuario/' +
      localStorage.getItem('userid') + '/curso/' + this.route.snapshot.params.id + '/imagen/' + this.nombreFoto, archivo);
    // Cambia el porcentaje
    tarea.percentageChanges().subscribe((porcentaje) => {
      this.porcentajeFoto = Math.round(porcentaje);
      if (this.porcentajeFoto == 100) {
        var currentTime = new Date().getTime();
        while (currentTime + 1000 >= new Date().getTime()) {
        }
        referencia.getDownloadURL().subscribe((URL) => {
          datos.imagen = URL;
          this.cursos.updateFotoVideo(this.route.snapshot.params.id, datos).subscribe(res => {
            this.finalizadoFoto = true;
            this.cambiaFoto = false;
            if (!this.viejaFoto.includes('www.lorempixel.com')) {
              this.viejaFoto = this.viejaFoto.split('imagen%2F')[1];
              this.viejaFoto = this.viejaFoto.split('?')[0];
              if (!this.viejaFoto.includes(this.nombreFoto)) {
                const referenciaBorrar = this.firebase.referenciaCloudStorage('usuario/' +
                  localStorage.getItem('userid') + '/curso/' + this.route.snapshot.params.id + '/imagen/' + this.viejaFoto);
                referenciaBorrar.delete().subscribe(() => {
                  this.ngOnInit();
                });
              } else {
                this.ngOnInit();
              }
            } else {
              this.ngOnInit();
            }
          });
        });
      }
    });
  }

  public subirVideo() {
    this.viejoVideo = this.infoCurso.introduccionVideo;
    var datos = {
      imagen: this.infoCurso.imagen,
      introduccionVideo: this.infoCurso.introduccionVideo
    }
    this.finalizadoVideo = false;
    this.porcentajeVideo = 0;
    const archivo = this.datosFormularioVideo.get('archivo');
    const referencia = this.firebase.referenciaCloudStorage('usuario/' + localStorage.getItem('userid') + '/curso/' + this.route.snapshot.params.id + '/video/' + this.nombreVideo);
    const tarea = this.firebase.tareaCloudStorage('usuario/' + localStorage.getItem('userid') + '/curso/' + this.route.snapshot.params.id + '/video/' + this.nombreVideo, archivo);
    // Cambia el porcentaje
    tarea.percentageChanges().subscribe((porcentaje) => {
      this.porcentajeVideo = Math.round(porcentaje);
      if (this.porcentajeVideo == 100) {
        var currentTime = new Date().getTime();
        while (currentTime + 1000 >= new Date().getTime()) {
        }
        referencia.getDownloadURL().subscribe((URL) => {
          datos.introduccionVideo = URL;
          this.cursos.updateFotoVideo(this.route.snapshot.params.id, datos).subscribe(res => {
            this.finalizadoVideo = true;
            this.cambiaVideo = false;
            if (!this.viejoVideo.includes('vjs.zencdn.net/v/oceans.mp4')) {
              this.viejoVideo = this.viejoVideo.split('video%2F')[1];
              this.viejoVideo = this.viejoVideo.split('?')[0];
              if (!this.viejoVideo.includes(this.nombreVideo)) {
                const referenciaBorrar = this.firebase.referenciaCloudStorage('usuario/' +
                  localStorage.getItem('userid') + '/curso/' + this.route.snapshot.params.id + '/video/' + this.viejoVideo);
                referenciaBorrar.delete().subscribe(() => {
                  this.ngOnInit();
                });
              } else {
                this.ngOnInit();
              }
            } else {
              this.ngOnInit();
            }
          });
        });
      }
    });
  }

  guardarObjetivo() {
    if (this.editar) {
      this.infoCurso.objetivos[this.editado] = { objetivo: this.objetivosForm.value.objetivo };
    } else {
      this.infoCurso.objetivos.push({ objetivo: this.objetivosForm.value.objetivo });
    }
    this.cursos.updateObjetivos(this.route.snapshot.params.id, { objetivos: this.infoCurso.objetivos }).subscribe(res => {
      this.mostrarFormObjetivo = false;
    });
  }
  eliminarObjetivo(i) {
    this.infoCurso.objetivos.splice(i, 1);
    this.cursos.updateObjetivos(this.route.snapshot.params.id, { objetivos: this.infoCurso.objetivos }).subscribe(res => {
      this.mostrarFormObjetivo = false;
    });
  }

  editarObjetivo(i) {
    this.mostrarFormObjetivo = true;
    this.objetivosForm.setValue({
      objetivo: this.infoCurso.objetivos[i].objetivo
    });
    this.editado = i
    this.editar = true
  }

  addObjetivo() {
    this.editar = false
    this.mostrarFormObjetivo = true;
    this.objetivosForm.setValue({
      objetivo: ''
    });
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
