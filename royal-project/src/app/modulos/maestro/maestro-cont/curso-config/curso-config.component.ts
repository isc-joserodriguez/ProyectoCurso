import { Component, OnInit } from '@angular/core';
import { CursosService } from '../../../../servicios/cursos.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-curso-config',
  templateUrl: './curso-config.component.html',
  styleUrls: ['./curso-config.component.scss']
})
export class CursoConfigComponent implements OnInit {
  infoCurso = {
    idMaestro: 0,
    nombreCompleto: 'Hola',
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

  constructor(private cursos: CursosService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getCurso(this.route.snapshot.params);
  }

  getCurso(ruta) {
    /* this.cursos.getCursoInfo(ruta).subscribe(curso=>{
      console.log(curso);
    }); */
  }

}
