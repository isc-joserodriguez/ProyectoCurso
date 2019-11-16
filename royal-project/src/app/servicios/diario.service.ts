import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const apiUrl = environment.urlMongo + 'diario';

@Injectable({
  providedIn: 'root'
})
export class DiarioService {
  constructor(private http: HttpClient) { }

  addEntradaNueva(entrada) {
    return this.http.post(apiUrl + '/nuevaEntrada', entrada);
  }

  getEntrada(ruta) {
    return this.http.get(apiUrl + '/getEntrada/' + ruta);
  }

  getEntradas() {
    return this.http.get(apiUrl + '/getEntradas');
  }

  agregarRespuesta(ruta, respuestas) {
    return this.http.put(apiUrl + '/agregarResp/' + ruta, respuestas);
  }

  agregarReporte(ruta, datos) {
    return this.http.put(apiUrl + '/agregarReporte/' + ruta, datos);
  }
}
