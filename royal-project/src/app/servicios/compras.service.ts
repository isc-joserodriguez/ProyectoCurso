import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const apiUrl = environment.urlMongo + 'compras';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {


  constructor(private http: HttpClient) {
  }
  getComprasUsuario(libreria, autor, fecha) {
    this.http.get(apiUrl + '/getComprasUsuario/' + libreria + '/' + autor + '/' + fecha);
  }



  getTodasLasCompras() {
    this.http.get(apiUrl + '/getAllCompras/');
  }





  asignarCompraUsuario(variable) {
    this.http.post(apiUrl + '/createCompraUsuario/:id', variable);
  }
}
