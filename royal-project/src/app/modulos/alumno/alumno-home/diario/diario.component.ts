import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { DiarioService } from 'src/app/servicios/diario.service';

@Component({
  selector: 'app-diario',
  templateUrl: './diario.component.html',
  styleUrls: ['./diario.component.scss']
})
export class DiarioComponent implements OnInit {
  p: number = 1;
  iduser = localStorage.getItem('userid') == null;
  listaEntradas = [];
  entradasFiltradas = [];
  subcategorias = [];
  filtro = [];

  constructor(private usuarios: UsuariosService, private diario: DiarioService) { }

  ngOnInit() {
    this.iduser = localStorage.getItem('userid') == null;
    this.listaEntradas = [];
    this.entradasFiltradas = [];
    this.getListaEntradas();
  }
  getListaEntradas() {
    this.listaEntradas = [];
    this.diario.getEntradas().subscribe((res: any) => {
      res.detail.forEach(entrada => {
        this.usuarios.getUser(entrada.idPersona).subscribe((info: any) => {
          if (!this.subcategorias.includes(entrada.categoria)) this.subcategorias.push(entrada.categoria);
          this.subcategorias = this.subcategorias.sort();
          if (!entrada.reportado)
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
      });
      this.entradasFiltradas = this.listaEntradas;
      var a = [];
      new Set(this.subcategorias).forEach(e => {
        a.push(e);
      });
      this.subcategorias = a;
    });
  }
  filtrar(event, element) {
    if (event.checked == true) {
      this.filtro.push(element);
    } else {
      var index = 0;
      this.filtro.forEach((e, i) => {
        if (e == element) index = i;
      });
      this.filtro.splice(index, 1);
    }
    this.listaEntradas = [];
    this.entradasFiltradas.forEach(curso => {
      if (this.filtro.includes(curso.categoria)) {
        this.listaEntradas.push(curso);
      }
    });

  }
}
