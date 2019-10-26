import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const apiUrl = environment.urlMongo + 'cursos';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  constructor(private http: HttpClient) { }

  getCursosMaestro(idMaestro) {
    return this.http.get(apiUrl + '/getCursosMaestro/' + idMaestro);
  }

  getCursoInfo(id) {
    return this.http.get(apiUrl + '/getCursoInfo/' + id);
  }

  addCursoNuevo(curso) {
    return this.http.post(apiUrl + '/nuevoCurso', curso);
  }

  getSubcategorias() {
    return this.http.get(apiUrl + '/getSubcategorias/');
  }

  getCursosSolicitudes() {
    return this.http.get(apiUrl + '/getCursosSolicitudes/');
  }

  getCursosAprobados() {
    return this.http.get(apiUrl + '/getCursosAprobados/');
  }

  getCursos() {
    return this.http.get(apiUrl + '/getCursos/');
  }

  updateEstado(id, estatus) {
    return this.http.put(apiUrl + '/updateEstado/' + id, estatus);
  }

  updateInsignias(id, insignias) {
    return this.http.put(apiUrl + '/updateInsignias/' + id, insignias);
  }

  getBusqueda(busqueda) {
    return this.http.get(apiUrl + '/getBusqueda/' + busqueda);
  }

  updateFotoVideo(id, datos) {
    console.log('ejecucion del update');
    return this.http.put(apiUrl + '/updateFotoVideo/' + id, datos);
  }

  updateTemario(id, datos) {
    return this.http.put(apiUrl + '/updateTemario/' + id, datos);
  }

  updateObjetivos(id, datos) {
    return this.http.put(apiUrl + '/updateObjetivos/' + id, datos);
  }

  inscribirAlumno(id, datos) {
    return this.http.put(apiUrl + '/inscribirAlumno/' + id, datos);
  }

}
