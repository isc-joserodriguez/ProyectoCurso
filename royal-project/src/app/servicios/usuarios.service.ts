import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const apiUrl = environment.urlMongo + 'personas';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(apiUrl + '/getAll');
  }

  updateTipo(id, tipo) {
    return this.http.put(apiUrl + '/editTipo/' + id, tipo);
  }

  getUser(id) {
    return this.http.get(apiUrl + '/get/' + id);
  }

  getUserByRute(id) {
    return this.http.get(apiUrl + '/getUserByRute/' + id);
  }

  updateDatos(id, datos) {
    return this.http.put(apiUrl + '/editDatos/' + id, datos);
  }

  updateCodigos(id, codigos) {
    return this.http.put(apiUrl + '/updateCodigos/' + id, codigos);
  }

  updateCursosMaestro(id, datos) {
    return this.http.put(apiUrl + '/updateCursosMaestro/' + id, datos);
  }

  updateCredencial(id, datos) {
    return this.http.put(apiUrl + '/editCredencial/' + id, datos);
  }

  updateAvance(id, datos) {
    return this.http.put(apiUrl + '/updateAvance/' + id, datos);
  }

  updateDocs(id, datos) {
    return this.http.put(apiUrl + '/updateDocs/' + id, datos);
  }

  updateInsignia(id, insignia) {
    return this.http.put(apiUrl + '/updateInsignia/' + id, insignia);
  }
  updatePuntaje(id, puntaje) {
    return this.http.put(apiUrl + '/updatePuntaje/' + id, puntaje);
  }
  updateNotificaciones(id, Notificaciones) {
    return this.http.put(apiUrl + '/updateNotificaciones/' + id, Notificaciones);
  }
  updateCert(id, datos) {
    return this.http.put(apiUrl + '/updateCert/' + id, datos);
  }

  inscribirAlumno(id, datos) {
    return this.http.put(apiUrl + '/inscribirAlumno/' + id, datos);
  }
}
