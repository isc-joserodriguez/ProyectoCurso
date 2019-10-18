import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComunidadService } from 'src/app/servicios/comunidad.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-comunidad-pregunta',
  templateUrl: './comunidad-pregunta.component.html',
  styleUrls: ['./comunidad-pregunta.component.scss']
})
export class ComunidadPreguntaComponent implements OnInit {
  iduser = localStorage.getItem('userid');
  propia = false
  numPreguntas=0;

  respuesta: any = {
    code: 0,
    msg: '',
    detail: ''
  };

  infoPersona = {
    foto: '',
    nombreCompleto: '',
    resumen: '',
    id: 0
  };

  ifoRespuestas=[];

  infoPregunta: any = {
    actualizaciones: [],
    categoria: '',
    detalles: '',
    fecha: '',
    idPersona: 0,
    pregunta: '',
    respuestas: [],
    ruta: ''
  }

  editarCategoria = false;
  editarPregunta = false;

  preguntaForm: FormGroup;
  actualizacionForm: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, private usuarios: UsuariosService, private comunidad: ComunidadService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.preguntaForm = this.formBuilder.group({
      pregunta: ['', Validators.required]
    });

    this.actualizacionForm = this.formBuilder.group({
      actualizacion: ['', Validators.required]
    });

    this.getPregunta(this.route.snapshot.params.ruta);

  }

  getPregunta(ruta) {
    this.comunidad.getPregunta(ruta).subscribe(res => {
      this.respuesta = res;
      this.infoPregunta = this.respuesta.detail[0];
      console.log(this.infoPregunta);
      this.numPreguntas=this.infoPregunta.respuestas.length;
      if (this.infoPregunta.idPersona == this.iduser) {
        this.propia = true;
      }
      this.getinfoPersona(this.infoPregunta.idPersona);
    });
    if (localStorage.getItem('pregunta') != null) {
      this.preguntaForm.setValue({
        pregunta: localStorage.getItem('pregunta')
      });
    }
  }

  getinfoPersona(id) {
    this.usuarios.getUser(id).subscribe(usuario => {
      this.respuesta = usuario;
      this.infoPersona.id = this.respuesta.detail[0]._id;
      this.infoPersona.foto = this.respuesta.detail[0].foto;
      this.infoPersona.nombreCompleto = this.respuesta.detail[0].nombre + ' ' + this.respuesta.detail[0].apPaterno + ' ' + this.respuesta.detail[0].apMaterno;
      this.infoPersona.resumen = this.respuesta.detail[0].resumen;
    });
  }

  hacerPregunta() {
    localStorage.setItem('pregunta', this.preguntaForm.value.pregunta);
    this.router.navigate(['/comunidad/nueva', this.infoPregunta.categoria]);
  }

  cambiarCategoria() {
    this.comunidad.cambiarCategoria(this.route.snapshot.params.ruta, { categoria: this.infoPregunta.categoria }).subscribe(res => {
      this.getPregunta(this.route.snapshot.params.ruta);
      this.editarCategoria = false;
    });
  }

  agregarActualizacion() {
    this.infoPregunta.actualizaciones.push({ actualizacion: this.actualizacionForm.value.actualizacion });

    this.comunidad.agregarActualizacion(this.route.snapshot.params.ruta, { actualizaciones: this.infoPregunta.actualizaciones }).subscribe(res => {
      this.getPregunta(this.route.snapshot.params.ruta);
      this.editarPregunta = false;
      this.actualizacionForm = this.formBuilder.group({
        actualizacion: ['', Validators.required]
      });
    });
  }

}
