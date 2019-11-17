import { Component, OnInit } from '@angular/core';
import { CursosService } from 'src/app/servicios/cursos.service';
import { ComunidadService } from 'src/app/servicios/comunidad.service';
import { DiarioService } from 'src/app/servicios/diario.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-admin-reportes',
  templateUrl: './admin-reportes.component.html',
  styleUrls: ['./admin-reportes.component.scss']
})
export class AdminReportesComponent implements OnInit {
  preguntasExpand = false;
  preguntasReportes = [];
  diarioExpand = false;
  diarioReportes = [];
  comentariosExpand = false;
  comentariosReportes = [];

  constructor(private usuarios: UsuariosService, private cursos: CursosService, private comunidad: ComunidadService, private diario: DiarioService) { }

  ngOnInit() {
    this.preguntasExpand = false;
    this.preguntasReportes = [];
    this.diarioExpand = false;
    this.diarioReportes = [];
    this.comentariosExpand = false;
    this.comentariosReportes = [];
    this.getReportesCursos()
    this.getReportesComunidad()
    this.getReportesDiario()
  }

  getReportesCursos() {
    this.cursos.getCursos().subscribe((cursos: any) => {
      cursos.detail.forEach(curso => {
        curso.reportes.forEach((reporte, indexReporte) => {
          if (reporte.activo) {
            if (reporte.tipo == 1) {
              this.usuarios.getUser(curso.contenidoCurso[reporte.unidad].subtemas[reporte.subtema].clases[reporte.clase].comentarios[reporte.respn1].idPersona).subscribe((usuario: any) => {
                this.comentariosReportes.push({
                  nombreCompleto: usuario.detail[0].nombre + ' ' + usuario.detail[0].apPaterno + ' ' + usuario.detail[0].apMaterno,
                  id: usuario.detail[0]._id,
                  foto: usuario.detail[0].foto,
                  comentario: curso.contenidoCurso[reporte.unidad].subtemas[reporte.subtema].clases[reporte.clase].comentarios[reporte.respn1].comentario,
                  fecha: curso.contenidoCurso[reporte.unidad].subtemas[reporte.subtema].clases[reporte.clase].comentarios[reporte.respn1].fecha,
                  contenidoCurso: curso.contenidoCurso,
                  reportes: curso.reportes,
                  index: indexReporte,
                  rutaCurso: curso.ruta
                });
              });
            } else {
              this.usuarios.getUser(curso.contenidoCurso[reporte.unidad].subtemas[reporte.subtema].clases[reporte.clase].comentarios[reporte.respn1].respuestas[reporte.respn2].idPersona).subscribe((usuario: any) => {
                this.comentariosReportes.push({
                  nombreCompleto: usuario.detail[0].nombre + ' ' + usuario.detail[0].apPaterno + ' ' + usuario.detail[0].apMaterno,
                  id: usuario.detail[0]._id,
                  foto: usuario.detail[0].foto,
                  comentario: curso.contenidoCurso[reporte.unidad].subtemas[reporte.subtema].clases[reporte.clase].comentarios[reporte.respn1].respuestas[reporte.respn2].comentario,
                  fecha: curso.contenidoCurso[reporte.unidad].subtemas[reporte.subtema].clases[reporte.clase].comentarios[reporte.respn1].respuestas[reporte.respn2].fecha,
                  contenidoCurso: curso.contenidoCurso,
                  reportes: curso.reportes,
                  index: indexReporte,
                  rutaCurso: curso.ruta
                });
              });
            }
            this.comentariosExpand = true;
          }
        });
      });
    });
  }
  omitirComentario(reportes, contenidoCurso, index, ruta) {
    reportes[index].activo = false;
    if (reportes[index].tipo == 1) {
      contenidoCurso[reportes[index].unidad].subtemas[reportes[index].subtema].clases[reportes[index].clase].comentarios[reportes[index].respn1].reportado = false;
    } else {
      contenidoCurso[reportes[index].unidad].subtemas[reportes[index].subtema].clases[reportes[index].clase].comentarios[reportes[index].respn1].respuestas[reportes[index].respn2].reportado = false;
    }
    this.cursos.agregarReporte(ruta, { contenidoCurso: contenidoCurso, reportes: reportes }).subscribe(res => {
      this.ngOnInit();
    });
  }
  aceptarComentario(reportes, contenidoCurso, index, ruta) {
    reportes[index].activo = false;
    this.cursos.agregarReporte(ruta, { contenidoCurso: contenidoCurso, reportes: reportes }).subscribe(res => {
      this.ngOnInit();
    });
  }

  getReportesDiario() {
    this.diario.getEntradas().subscribe((entradas: any) => {
      entradas.detail.forEach(entrada => {
        entrada.reportes.forEach((reporte, indexReporte) => {
          if (reporte.activo) {
            if (reporte.tipo == 0) {
              this.usuarios.getUser(entrada.idPersona).subscribe((usuario: any) => {
                this.diarioReportes.push({
                  nombreCompleto: usuario.detail[0].nombre + ' ' + usuario.detail[0].apPaterno + ' ' + usuario.detail[0].apMaterno,
                  id: usuario.detail[0]._id,
                  foto: usuario.detail[0].foto,
                  comentario: entrada.escrito,
                  fecha: entrada.fecha,
                  respuestas: entrada.respuestas,
                  reportes: entrada.reportes,
                  index: indexReporte,
                  rutaDiario: entrada.ruta,
                  estatusEntrada: entrada.reportado
                });
              });
            } else if (reporte.tipo == 1) {
              this.usuarios.getUser(entrada.respuestas[reporte.respn1].idPersona).subscribe((usuario: any) => {
                this.diarioReportes.push({
                  nombreCompleto: usuario.detail[0].nombre + ' ' + usuario.detail[0].apPaterno + ' ' + usuario.detail[0].apMaterno,
                  id: usuario.detail[0]._id,
                  foto: usuario.detail[0].foto,
                  comentario: entrada.respuestas[reporte.respn1].comentario,
                  fecha: entrada.fecha,
                  respuestas: entrada.respuestas,
                  reportes: entrada.reportes,
                  index: indexReporte,
                  rutaDiario: entrada.ruta,
                  estatusEntrada: entrada.reportado
                });
              });
            } else {
              this.usuarios.getUser(entrada.respuestas[reporte.respn1].respuestas[reporte.respn2].idPersona).subscribe((usuario: any) => {
                this.diarioReportes.push({
                  nombreCompleto: usuario.detail[0].nombre + ' ' + usuario.detail[0].apPaterno + ' ' + usuario.detail[0].apMaterno,
                  id: usuario.detail[0]._id,
                  foto: usuario.detail[0].foto,
                  comentario: entrada.respuestas[reporte.respn1].respuestas[reporte.respn2].comentario,
                  fecha: entrada.fecha,
                  respuestas: entrada.respuestas,
                  reportes: entrada.reportes,
                  index: indexReporte,
                  rutaDiario: entrada.ruta,
                  estatusEntrada: entrada.reportado
                });
              });
            }
            this.diarioExpand = true;
          }
        });
      });
    });
  }
  omitirDiario(reportes, respuestas, index, ruta, estatus) {
    reportes[index].activo = false;
    if (reportes[index].tipo == 0) {
      estatus = false
    } else if (reportes[index].tipo == 1) {
      respuestas[reportes[index].respn1].respuestas.reportado = false;
    } else {
      respuestas[reportes[index].respn1].respuestas[reportes[index].respn2].reportado = false;
    }
    this.diario.agregarReporte(ruta, { respuestas: respuestas, reportado: estatus, reportes: reportes }).subscribe(res => {
      this.ngOnInit();
    });
  }
  aceptarDiario(reportes, respuestas, index, ruta, estatus) {
    reportes[index].activo = false;
    this.diario.agregarReporte(ruta, { respuestas: respuestas, reportado: estatus, reportes: reportes }).subscribe(res => {
      this.ngOnInit();
    });
  }
  getReportesComunidad() {
    this.comunidad.getPreguntas().subscribe((preguntas: any) => {
      preguntas.detail.forEach(pregunta => {
        pregunta.reportes.forEach((reporte, indexReporte) => {
          if (reporte.activo) {
            if (reporte.tipo == 0) {
              this.usuarios.getUser(pregunta.idPersona).subscribe((usuario: any) => {
                this.preguntasReportes.push({
                  nombreCompleto: usuario.detail[0].nombre + ' ' + usuario.detail[0].apPaterno + ' ' + usuario.detail[0].apMaterno,
                  id: usuario.detail[0]._id,
                  foto: usuario.detail[0].foto,
                  comentario: pregunta.detalles,
                  actualizaciones: pregunta.actualizaciones,
                  fecha: pregunta.fecha,
                  respuestas: pregunta.respuestas,
                  reportes: pregunta.reportes,
                  index: indexReporte,
                  rutaPregunta: pregunta.ruta,
                  estatusEntrada: pregunta.reportado
                });
              });
            } else if (reporte.tipo == 1) {
              this.usuarios.getUser(pregunta.respuestas[reporte.respn1].idPersona).subscribe((usuario: any) => {
                this.preguntasReportes.push({
                  nombreCompleto: usuario.detail[0].nombre + ' ' + usuario.detail[0].apPaterno + ' ' + usuario.detail[0].apMaterno,
                  id: usuario.detail[0]._id,
                  foto: usuario.detail[0].foto,
                  comentario: pregunta.respuestas[reporte.respn1].comentario,
                  actualizaciones: [],
                  fecha: pregunta.fecha,
                  respuestas: pregunta.respuestas,
                  reportes: pregunta.reportes,
                  index: indexReporte,
                  rutaPregunta: pregunta.ruta,
                  estatusEntrada: pregunta.reportado
                });
              });
            } else {
              this.usuarios.getUser(pregunta.respuestas[reporte.respn1].respuestas[reporte.respn2].idPersona).subscribe((usuario: any) => {
                this.preguntasReportes.push({
                  nombreCompleto: usuario.detail[0].nombre + ' ' + usuario.detail[0].apPaterno + ' ' + usuario.detail[0].apMaterno,
                  id: usuario.detail[0]._id,
                  foto: usuario.detail[0].foto,
                  comentario: pregunta.respuestas[reporte.respn1].respuestas[reporte.respn2].comentario,
                  actualizaciones: [],
                  fecha: pregunta.fecha,
                  respuestas: pregunta.respuestas,
                  reportes: pregunta.reportes,
                  index: indexReporte,
                  rutaPregunta: pregunta.ruta,
                  estatusEntrada: pregunta.reportado
                });
              });
            }
            this.preguntasExpand = true;
          }
        });
      });
    });
  }
  omitirPregunta(reportes, respuestas, index, ruta, estatus) {
    reportes[index].activo = false;
    if (reportes[index].tipo == 0) {
      estatus = false
    } else if (reportes[index].tipo == 1) {
      respuestas[reportes[index].respn1].respuestas.reportado = false;
    } else {
      respuestas[reportes[index].respn1].respuestas[reportes[index].respn2].reportado = false;
    }
    this.comunidad.agregarReporte(ruta, { respuestas: respuestas, reportado: estatus, reportes: reportes }).subscribe(res => {
      this.ngOnInit();
    });
  }
  aceptarPregunta(reportes, respuestas, index, ruta, estatus) {
    reportes[index].activo = false;
    this.comunidad.agregarReporte(ruta, { respuestas: respuestas, reportado: estatus, reportes: reportes }).subscribe(res => {
      this.ngOnInit();
    });
  }
}
