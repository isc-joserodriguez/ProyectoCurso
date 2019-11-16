import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { DiarioService } from 'src/app/servicios/diario.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CursosService } from 'src/app/servicios/cursos.service';

@Component({
  selector: 'app-diario',
  templateUrl: './diario.component.html',
  styleUrls: ['./diario.component.scss']
})
export class DiarioComponent implements OnInit {

  listaEntradas = [];

  constructor(private cursos: CursosService, private usuarios: UsuariosService, private diario: DiarioService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.listaEntradas = [];
      this.getListaEntradas(params.get('id'));
    });
  }
  getListaEntradas(idCurso) {
    this.listaEntradas = [];
    this.cursos.getCursoInfo(idCurso).subscribe((curso: any) => {
      var alumnos = [];
      curso.detail[0].alumnosInscritos.forEach(e => {
        alumnos.push(e.idAlumno);
      });
      this.diario.getEntradas().subscribe((res: any) => {
        res.detail.forEach(entrada => {
          if (alumnos.includes(entrada.idPersona) && entrada.categoria == curso.detail[0].subcategoria) {
            this.usuarios.getUser(entrada.idPersona).subscribe((info: any) => {
              this.listaEntradas.push({
                //Pendiente
                insignias: info.detail[0].insignias.length,
                cursos: info.detail[0].cursoAlumno.length,
                fecha: entrada.fecha,
                categoria: entrada.categoria,
                foto: info.detail[0].foto,
                rutaPersona: info.detail[0].ruta,
                id: entrada.idPersona,
                escrito: entrada.escrito,
                titulo: entrada.titulo,
                ruta: entrada.ruta,
                nombre: info.detail[0].nombre + ' ' + info.detail[0].apPaterno + ' ' + info.detail[0].apMaterno
              });
            });
          }
        });
      });
    });
  }

}
