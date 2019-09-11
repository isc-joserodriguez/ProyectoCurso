import { Component, OnInit } from '@angular/core';
import { CursosService } from '../../../../servicios/cursos.service'

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

  id = 1;

  infoCurso = {
    nombreCompleto: '',
    precio: 0,
    videoPrincipal: 'http://www.lorempixel.com/900/500',
    descripcion: '👩🏼‍🎓Cada nivel tiene una duración de 10 semanas 🎓Son 8 niveles para adquirir un nivel profesional 🌎Y a partir de 4 puedes realizar la certificación internacional 👥Grupos reducidos mínimo 5 máximo 16 estudiantes 🇩🇪HORARIOS ALEMÁN | 1 GRUPO ⏰MARTES Y JUEVES 6-8pm Inicio 27 Agosto 👩🏻‍🏫Maestros Lic en Lingüística Aplicada y Comercio Internacional 📍Inscripciones e información en Insurgentes #88 entre Puebla y Veracruz',
    valoracion: 3,
    inscritos: 32,
    objetivos: ['Aprender Algo', 'Aplicar lo aprendido', 'Enseñar todo']
    
  }

  constructor(private curso: CursosService) { }

  ngOnInit() {
    this.getInfoCurso(this.id);
  }
  getInfoCurso(id) {
    console.log(id);
    this.curso.getCursoInfo(id).subscribe(curso => {
      console.log(curso);
      this.respuesta=curso;
      this.infoCurso.nombreCompleto=this.respuesta.detail[0].nombreCompleto;
      this.infoCurso.precio=520;
      this.infoCurso.videoPrincipal='http://www.lorempixel.com/900/500';
      this.infoCurso.descripcion=this.respuesta.detail[0].descripcionCurso;
      this.infoCurso.valoracion=5;
      this.infoCurso.inscritos=5;
      /* this.infoCurso.objetivos=this.respuesta.detail[0].objetivos; */
      this.infoCurso.objetivos=[];
      this.respuesta.detail[0].objetivos.forEach(elemento=>{
        this.infoCurso.objetivos.push(elemento.objetivo);
      })

    });
  }

}
