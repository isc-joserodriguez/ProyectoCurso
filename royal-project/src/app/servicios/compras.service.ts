import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const apiUrl = environment.urlMongo + '/compras';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {


  constructor(private http: HttpClient) {
  }

  //GET localhost:3002/compras/getComprasUsuario/:idLibreria/:idAutor/:fecha
  /*
  {
    code: 200,
    msg: 'Hurra, perfecto',
    detail: '[{totalVendido:x,libroMasCaro:'fulano'},{totalVendido:x,libroMasCaro:'fulano'},{totalVendido:x,libroMasCaro:'fulano'},{totalVendido:x,libroMasCaro:'fulano'}]'
  }
  */
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
