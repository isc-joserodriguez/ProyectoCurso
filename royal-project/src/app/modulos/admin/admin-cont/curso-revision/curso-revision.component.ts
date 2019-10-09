import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CursosService } from 'src/app/servicios/cursos.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
declare let videojs: any;

@Component({
  selector: 'app-curso-revision',
  templateUrl: './curso-revision.component.html',
  styleUrls: ['./curso-revision.component.scss']
})
export class CursoRevisionComponent implements OnInit, OnDestroy {
  respuesta: any = {
    code: 0,
    msg: '',
    detail: ''
  };
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
  infoMaestro = {
    foto: '',
    nombreCompleto: '',
    resumen: '',
    id: 0
  };
  revisionForm: FormGroup;
  constructor(private router: Router, private route: ActivatedRoute, private curso: CursosService, private usuarios: UsuariosService, private formBuilder: FormBuilder) { }
  ngOnInit() {
    window.scrollTo(0, 0);
    this.revisionForm = this.formBuilder.group({
      precio: ['', Validators.required],
      notas: ['', Validators.required]
    });
    this.getInfoCurso(this.route.snapshot.params.id);
  }
  ngOnDestroy(): void {
    var oldPlayer = document.getElementById('videoId');
    videojs(oldPlayer).dispose();
  }
  getInfoCurso(id) {
    this.curso.getCursoInfo(id).subscribe(curso => {
      //Pendientes
      this.respuesta = curso;
      this.infoCurso.nombreCompleto = this.respuesta.detail[0].nombreCompleto;
      this.infoCurso.precio = this.respuesta.detail[0].precio;
      this.infoCurso.introduccionVideo = this.respuesta.detail[0].introduccionVideo;
      this.infoCurso.imagen = this.respuesta.detail[0].imagen;
      this.infoCurso.descripcion = this.respuesta.detail[0].descripcionCurso;
      this.infoCurso.valoracion = 5;
      this.infoCurso.inscritos = 5;
      this.infoCurso.notas = this.respuesta.detail[0].notas;
      this.infoCurso.objetivos = this.respuesta.detail[0].objetivos;
      this.infoCurso.objetivos = [];
      this.respuesta.detail[0].objetivos.forEach(elemento => {
        this.infoCurso.objetivos.push(elemento.objetivo);
      });
      videojs("videoId", {
        sources: [{
          src: this.infoCurso.introduccionVideo,
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
      this.infoMaestro.id = this.respuesta.detail[0]._id;
      this.infoMaestro.foto = this.respuesta.detail[0].foto;
      this.infoMaestro.nombreCompleto = this.respuesta.detail[0].nombre + ' ' + this.respuesta.detail[0].apPaterno + ' ' + this.respuesta.detail[0].apMaterno;
      this.infoMaestro.resumen = this.respuesta.detail[0].resumen;
    });
  }
  aceptarCurso() {
    const estatus = { estado: 2, notas: this.revisionForm.value.notas, precio: this.revisionForm.value.precio };
    this.curso.updateEstado(this.route.snapshot.params.id, estatus).subscribe(res => {
      this.router.navigate(['/admin/cursos']);
    });
  }
  rechazarCurso() {
    const estatus = { estado: 3, notas: this.revisionForm.value.notas, precio: this.revisionForm.value.precio };
    this.curso.updateEstado(this.route.snapshot.params.id, estatus).subscribe(res => {
      this.router.navigate(['/admin/cursos']);
    });
  }

}
