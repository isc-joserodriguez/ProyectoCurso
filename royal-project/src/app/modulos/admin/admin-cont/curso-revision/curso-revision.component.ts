import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CursosService } from 'src/app/servicios/cursos.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
declare let videojs: any;

@Component({
  selector: 'app-curso-revision',
  templateUrl: './curso-revision.component.html',
  styleUrls: ['./curso-revision.component.scss']
})
export class CursoRevisionComponent implements OnInit, OnDestroy {
  royal = true;
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
    royal: false
  };
  infoMaestro = {
    foto: '',
    nombreCompleto: '',
    resumen: '',
    cursoMaestro: [],
    id: 0
  };
  revisionForm: FormGroup;
  constructor(private router: Router, private route: ActivatedRoute, private curso: CursosService, private usuarios: UsuariosService, private formBuilder: FormBuilder) { }
  ngOnInit() {
    this.revisionForm = this.formBuilder.group({
      precio: ['', Validators.required],
      notas: ['', Validators.required],
      royal: [false]
    });
    this.getInfoCurso(this.route.snapshot.params.id);
  }
  ngOnDestroy(): void {
    var oldPlayer = document.getElementById('videoId');
    videojs(oldPlayer).dispose();
  }
  getInfoCurso(id) {
    this.curso.getCursoInfo(id).subscribe((curso: any) => {
      this.infoCurso.royal = curso.detail[0].royal;
      this.infoCurso.nombreCompleto = curso.detail[0].nombreCompleto;
      this.infoCurso.precio = curso.detail[0].precio;
      this.infoCurso.introduccionVideo = curso.detail[0].introduccionVideo;
      this.infoCurso.imagen = curso.detail[0].imagen;
      this.infoCurso.descripcion = curso.detail[0].descripcionCurso;
      this.infoCurso.valoracion = 0;
      this.infoCurso.inscritos = 0;
      this.infoCurso.notas = curso.detail[0].notas;
      this.infoCurso.objetivos = curso.detail[0].objetivos;
      this.infoCurso.objetivos = [];
      curso.detail[0].objetivos.forEach(elemento => {
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
      this.infoCurso.contenidoCurso = curso.detail[0].contenidoCurso;
      this.getInfoMaestro(curso.detail[0].idMaestro);
    });
  }
  getInfoMaestro(id) {
    this.usuarios.getUser(id).subscribe((usuario: any) => {
      this.infoMaestro.cursoMaestro = usuario.detail[0].cursoMaestro;
      this.infoMaestro.id = usuario.detail[0]._id;
      this.infoMaestro.foto = usuario.detail[0].foto;
      this.infoMaestro.nombreCompleto = usuario.detail[0].nombre + ' ' + usuario.detail[0].apPaterno + ' ' + usuario.detail[0].apMaterno;
      this.infoMaestro.resumen = usuario.detail[0].resumen;
    });
  }
  aceptarCurso() {
    const estatus = { estado: 2, notas: this.revisionForm.value.notas, precio: this.revisionForm.value.precio, royal: this.revisionForm.value.royal };
    this.curso.updateEstado(this.route.snapshot.params.id, estatus).subscribe(res => {
      this.infoMaestro.cursoMaestro.push({
        ruta: this.route.snapshot.params.id
      });
      this.usuarios.updateCursosMaestro(this.infoMaestro.id, { cursoMaestro: this.infoMaestro.cursoMaestro }).subscribe(res => {
        this.usuarios.getUser(this.infoMaestro.id).subscribe((user: any) => {
          user.detail[0].notificaciones.push({
            ruta: '/maestro/perfil/estado-cursos',
            descripcion: 'Curso aceptado: ' + this.infoCurso.nombreCompleto + '.'
          });
          this.usuarios.updateNotificaciones(this.infoMaestro.id, { notificaciones: user.detail[0].notificaciones }).subscribe(res => {
            this.router.navigate(['/admin/cursos']);
          });
        });
      });
    });
  }
  rechazarCurso() {
    const estatus = { estado: 3, notas: this.revisionForm.value.notas, precio: this.revisionForm.value.precio, royal: this.revisionForm.value.royal };
    this.curso.updateEstado(this.route.snapshot.params.id, estatus).subscribe(res => {
      this.usuarios.getUser(this.infoMaestro.id).subscribe((user: any) => {
        user.detail[0].notificaciones.push({
          ruta: '/maestro/perfil/estado-cursos',
          descripcion: 'Curso rechazado: ' + this.infoCurso.nombreCompleto + '.'
        });
        this.usuarios.updateNotificaciones(this.infoMaestro.id, { notificaciones: user.detail[0].notificaciones }).subscribe(res => {
          this.router.navigate(['/admin/cursos']);
        });
      });
    });
  }

}
