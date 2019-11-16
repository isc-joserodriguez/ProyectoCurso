import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const apiUrl = environment.urlMongo + 'comunidad';

@Injectable({
  providedIn: 'root'
})
export class ComunidadService {

  constructor(private http: HttpClient) { }

  addPreguntaNueva(pregunta) {
    return this.http.post(apiUrl + '/nuevaPregunta', pregunta);
  }

  getPregunta(ruta) {
    return this.http.get(apiUrl + '/getPregunta/' + ruta);
  }

  getPreguntas() {
    return this.http.get(apiUrl + '/getPreguntas');
  }

  cambiarCategoria(ruta, categoria) {
    return this.http.put(apiUrl + '/cambiaCat/' + ruta, categoria);
  }

  agregarActualizacion(ruta, actualizacion) {
    return this.http.put(apiUrl + '/agregarAct/' + ruta, actualizacion);
  }

  agregarRespuesta(ruta, respuestas) {
    return this.http.put(apiUrl + '/agregarResp/' + ruta, respuestas);
  }

  agregarReporte(ruta, datos) {
    return this.http.put(apiUrl + '/agregarReporte/' + ruta, datos);
  }
}
