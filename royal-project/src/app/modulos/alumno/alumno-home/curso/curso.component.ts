import { Component, OnInit } from '@angular/core';
import { CursosService } from 'src/app/servicios/cursos.service'
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.scss']
})

export class CursoComponent implements OnInit {
  respuesta: any = {
    code: 0,
    msg: '',
    detail: ''
  };
  infoCurso = {
    idMaestro: 0,
    nombreCompleto: '',
    precio: 0,
    videoPrincipal: 'http://www.lorempixel.com/900/500',
    descripcion: '👩🏼‍🎓Cada nivel tiene una duración de 10 semanas 🎓Son 8 niveles' +
      ' para adquirir un nivel profesional 🌎Y a partir de 4 puedes realizar la certificación' +
      ' internacional 👥Grupos reducidos mínimo 5 máximo 16 estudiantes 🇩🇪HORARIOS ALEMÁN | 1' +
      ' GRUPO ⏰MARTES Y JUEVES 6-8pm Inicio 27 Agosto 👩🏻‍🏫Maestros Lic en Lingüística Aplicada y' +
      ' Comercio Internacional 📍Inscripciones e información en Insurgentes #88 entre Puebla y ' +
      'Veracruz',
    valoracion: 3,
    inscritos: 32,
    objetivos: ['Aprender Algo', 'Aplicar lo aprendido', 'Enseñar todo'],
    contenidoCurso: [{}]
  };
  infoMaestro = {
    foto: 'http://www.lorempixel.com/200/200',
    nombreCompleto: 'Carla Reyes Godinez',
    resumen: 'Ingeniera en sistemas, Dos años de experiencia en IBM, Certificado en Diseño Web'
  };

  constructor(private route: ActivatedRoute, private curso: CursosService, private usuarios: UsuariosService) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.getInfoCurso(this.route.snapshot.params.id);
  }
  getInfoCurso(id) {
    this.curso.getCursoInfo(id).subscribe(curso => {
      // Pendientes
      this.respuesta = curso;
      this.infoCurso.nombreCompleto = this.respuesta.detail[0].nombreCompleto;
      this.infoCurso.precio = this.respuesta.detail[0].precio;
      this.infoCurso.videoPrincipal = 'http://www.lorempixel.com/900/500';
      this.infoCurso.descripcion = this.respuesta.detail[0].descripcionCurso;
      this.infoCurso.valoracion = 5;
      this.infoCurso.inscritos = 5;
      this.infoCurso.objetivos = this.respuesta.detail[0].objetivos;
      this.infoCurso.objetivos = [];
      this.respuesta.detail[0].objetivos.forEach(elemento => {
        this.infoCurso.objetivos.push(elemento.objetivo);
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
