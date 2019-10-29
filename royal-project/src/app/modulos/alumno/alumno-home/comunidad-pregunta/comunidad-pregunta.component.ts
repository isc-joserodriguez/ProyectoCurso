import { Component, OnInit, Inject, SecurityContext } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComunidadService } from 'src/app/servicios/comunidad.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import {DomSanitizer, SafeValue} from '@angular/platform-browser';


@Component({
  selector: 'app-comunidad-pregunta',
  templateUrl: './comunidad-pregunta.component.html',
  styleUrls: ['./comunidad-pregunta.component.scss']
})


export class ComunidadPreguntaComponent implements OnInit {
  
  
  iduser = localStorage.getItem('userid');
  propia = false
  numPreguntas = 0;



  infoPersona = {
    foto: '',
    nombreCompleto: '',
    resumen: '',
    id: 0
  };

  infoRespuestas = [];

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

  respuestaForm: FormGroup;
  preguntaForm: FormGroup;
  actualizacionForm: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, private usuarios: UsuariosService, private comunidad: ComunidadService, private formBuilder: FormBuilder,@Inject(DomSanitizer) private readonly sanitizer: DomSanitizer) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.preguntaForm = this.formBuilder.group({
      pregunta: ['', Validators.required]
    });

    this.actualizacionForm = this.formBuilder.group({
      actualizacion: ['', Validators.required]
    });

    this.respuestaForm = this.formBuilder.group({
      respuesta: ['', Validators.required]
    })

    this.getPregunta(this.route.snapshot.params.ruta);

  }

  getPregunta(ruta) {
    this.comunidad.getPregunta(ruta).subscribe((res: any) => {
      this.infoPregunta = res.detail[0];
      if (this.infoPregunta.categoria == 'tecnologia') {
        this.infoPregunta.categoria = 'Tecnología'
      } else {
        this.infoPregunta.categoria = 'Idiomas'
      }
      this.numPreguntas = this.infoPregunta.respuestas.length;
      if (this.infoPregunta.idPersona == this.iduser) {
        this.propia = true;
      }
      this.getinfoPersona(this.infoPregunta.idPersona);
      this.infoRespuestas = [];
      this.infoPregunta.respuestas.forEach(respuesta => {
        this.usuarios.getUser(respuesta.idPersona).subscribe((usuario: any) => {
          let nuevaRes: any = {
            nombreCompleto: usuario.detail[0].nombre + ' ' + usuario.detail[0].apPaterno + ' ' + usuario.detail[0].apMaterno,
            comentario: respuesta.comentario,
            fecha: respuesta.fecha,
            foto: usuario.detail[0].foto,
            id: respuesta.idPersona
          }
          this.infoRespuestas.push(nuevaRes);
        });
      });
    });
    if (localStorage.getItem('pregunta') != null) {
      this.preguntaForm.setValue({
        pregunta: localStorage.getItem('pregunta')
      });
    }
  }

  getinfoPersona(id) {
    this.usuarios.getUser(id).subscribe((usuario: any) => {
      this.infoPersona.id = usuario.detail[0]._id;
      this.infoPersona.foto = usuario.detail[0].foto;
      this.infoPersona.nombreCompleto = usuario.detail[0].nombre + ' ' + usuario.detail[0].apPaterno + ' ' + usuario.detail[0].apMaterno;
      this.infoPersona.resumen = usuario.detail[0].resumen;
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

  enviarRespuesta() {
    this.infoPregunta.respuestas.push({
      idPersona: localStorage.getItem('userid'),
      comentario: this.respuestaForm.value.respuesta
    });

    this.comunidad.agregarRespuesta(this.route.snapshot.params.ruta, { respuestas: this.infoPregunta.respuestas }).subscribe(res => {
      this.getPregunta(this.route.snapshot.params.ruta);
      this.respuestaForm = this.formBuilder.group({
        respuesta: ['', Validators.required]
      });
    });
  }

  navegarCat() {
    if (this.infoPregunta.categoria == 'Tecnología') {
      this.router.navigate(['/comunidad/tecnologia']);
    } else {
      this.router.navigate(['/comunidad/idiomas']);
    }
  }



}
