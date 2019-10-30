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

  getId(id) {
    return this.http.get(apiUrl + '/get/' + id);
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

  updateCredencial(id, datos) {
    return this.http.put(apiUrl + '/editCredencial/' + id, datos);
  }

  updateAvance(id, datos) {
    return this.http.put(apiUrl + '/updateAvance/' + id, datos);
  }

  updateInsignia(id, insignia) {
    return this.http.put(apiUrl + '/updateInsignia/' + id, insignia);
  }
  updateCert(id, datos) {
    return this.http.put(apiUrl + '/updateCert/' + id, datos);
  }

  inscribirAlumno(id, datos) {
    return this.http.put(apiUrl + '/inscribirAlumno/' + id, datos);
  }
}
