import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CursosService } from 'src/app/servicios/cursos.service'
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { FirebaseService } from 'src/app/servicios/firebase.service';
declare let videojs: any;

@Component({
  selector: 'app-curso-clase',
  templateUrl: './curso-clase.component.html',
  styleUrls: ['./curso-clase.component.scss']
})
export class CursoClaseComponent implements OnInit, OnDestroy, AfterViewInit {
  respuesta: any = {
    code: 0,
    msg: '',
    detail: ''
  };
  infoCurso: any = {
    contenidoCurso: [{}],
    imagen: '',
    alumnosInscritos: [],
    _id: 0
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

  player: any;

  viejoTarea = ''
  finalizadoTarea = true;
  cambiaTarea = false;
  mensajeTarea = 'No hay archivos';
  datosFormularioTarea = new FormData();
  nombreTarea = '';
  URLTarea = '';
  porcentajeTarea = 0;
  tareaEntregada = false;
  urlTarea = '';
  indexTarea = 0;
  infoTarea: any = {};
  tareaForm: FormGroup;
  constructor(private firebase: FirebaseService, private router: Router, private route: ActivatedRoute, private curso: CursosService, private usuarios: UsuariosService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      window.scrollTo(0, 0);
      this.tareaForm = this.formBuilder.group({
        tarea: ['']
      });
      this.getInfoClase(params.get('id'));
    });
  }
  ngOnDestroy(): void {
    var oldPlayer = document.getElementById('videoId');
    videojs(oldPlayer).dispose();
  }
  ngAfterViewInit(): void {
    this.player = videojs("videoId");
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
      //Video
      this.player.src({ type: "video/mp4", src: this.infoClase.video });
      this.player.poster(this.infoCurso.imagen);

      //console.log(this.infoClase);
      this.setAvance(localStorage.getItem('userid'));
      this.getTareas();

    });
  }

  getTareas() {
    this.tareaEntregada = false;
    this.infoClase.tarea.envios.forEach((tarea, index) => {
      if (tarea.idAlumno == localStorage.getItem('userid')) {
        this.tareaEntregada = true;
        this.infoTarea = tarea;
        this.indexTarea = index;
      }
    });
  }

  public seleccionarTarea(event) {
    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.mensajeTarea = `${event.target.files[i].name}`.substring(0, 9);
        this.nombreTarea = event.target.files[i].name;
        this.datosFormularioTarea.delete('archivo');
        this.datosFormularioTarea.append('archivo', event.target.files[i], event.target.files[i].name);
      }
    } else {
      this.mensajeTarea = 'No hay tarea';
    }
  }

  public eliminarTarea() {
    this.infoCurso.contenidoCurso[this.route.snapshot.params.unidad - 1].subtemas[this.route.snapshot.params.subtema - 1].clases[this.route.snapshot.params.clase - 1].tarea.envios.splice(this.indexTarea, 1);
    this.curso.updateTemario(this.route.snapshot.params.id, { contenidoCurso: this.infoCurso.contenidoCurso }).subscribe(res => {
      const referenciaBorrar = this.firebase.referenciaCloudStorage('usuario/' + localStorage.getItem('userid') + '/curso/' + this.route.snapshot.params.id + '/tarea/' + this.route.snapshot.params.unidad + '-' + this.route.snapshot.params.subtema + '-' + this.route.snapshot.params.clase + this.infoTarea.nombreTarea)
      referenciaBorrar.delete().subscribe(() => {
        this.ngOnInit();
      });
    });
  }

  public subirTarea() {
    this.viejoTarea = this.infoClase.video;
    this.finalizadoTarea = false;
    this.porcentajeTarea = 0;
    const archivo = this.datosFormularioTarea.get('archivo');
    const referencia = this.firebase.referenciaCloudStorage('usuario/' + localStorage.getItem('userid') + '/curso/' + this.route.snapshot.params.id + '/tarea/' + this.route.snapshot.params.unidad + '-' + this.route.snapshot.params.subtema + '-' + this.route.snapshot.params.clase + this.nombreTarea);
    const tarea = this.firebase.tareaCloudStorage('usuario/' + localStorage.getItem('userid') + '/curso/' + this.route.snapshot.params.id + '/tarea/' + this.route.snapshot.params.unidad + '-' + this.route.snapshot.params.subtema + '-' + this.route.snapshot.params.clase + this.nombreTarea, archivo);
    // Cambia el porcentaje
    tarea.percentageChanges().subscribe((porcentaje) => {
      this.porcentajeTarea = Math.round(porcentaje);
      if (this.porcentajeTarea == 100) {
        var currentTime = new Date().getTime();
        while (currentTime + 1000 >= new Date().getTime()) {
        }
        referencia.getDownloadURL().subscribe((URL) => {
          this.infoCurso.contenidoCurso[this.route.snapshot.params.unidad - 1].subtemas[this.route.snapshot.params.subtema - 1].clases[this.route.snapshot.params.clase - 1].tarea.envios.push(
            {
              idAlumno: localStorage.getItem('userid'),
              tarea: URL,
              nombreTarea: this.nombreTarea
            }
          );
          this.curso.updateTemario(this.route.snapshot.params.id, { contenidoCurso: this.infoCurso.contenidoCurso }).subscribe(res => {
            this.finalizadoTarea = true;
            this.tareaEntregada = true;
            this.ngOnInit();
          });
        });
      }
    });

  }
  setAvance(id) {
    this.cursosAlumno = [];
    this.avance = [parseInt(this.route.snapshot.params.unidad) - 1, parseInt(this.route.snapshot.params.subtema) - 1, parseInt(this.route.snapshot.params.clase) - 1];
    this.usuarios.getUser(id).subscribe(res => {
      this.respuesta = res;
      this.respuesta.detail[0].cursoAlumno.forEach(element => {
        if (element.ruta == this.infoCurso.ruta) {
          element.avance = this.avance[0] + '-' + this.avance[1] + '-' + this.avance[2]
        }
        this.cursosAlumno.push(element);
      });
      console.log(this.cursosAlumno);
      this.usuarios.updateAvance(id, this.cursosAlumno).subscribe(res => {
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
              this.router.navigate(['/curso/', this.route.snapshot.params.id]);
            }
          }
          this.goClase(infoAvance[0], infoAvance[1], infoAvance[2]);
        }
      }
    }

  }
}
