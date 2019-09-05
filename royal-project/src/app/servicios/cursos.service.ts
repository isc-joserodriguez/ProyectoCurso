import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const apiUrl = 'http://localhost:3002/cursos';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  constructor(private http: HttpClient) { }

  //localhost:3002/cursos/getCursosMaestro/:id GET 

  getCursosMaestro(idMaestro) {
    return this.http.get(apiUrl + '/getCursosMaestro/' + idMaestro);
  }

  addCursoNuevo(curso) {
    return this.http.post(apiUrl + '/nuevoCurso', curso);
  }

  getSubcategorias() {
    return this.http.get(apiUrl + '/getSubcategorias/');
  }
}
