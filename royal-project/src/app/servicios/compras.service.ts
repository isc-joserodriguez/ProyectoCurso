import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const apiUrl = environment.urlMongo + 'compras';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {


  constructor(private http: HttpClient) { }

  addCompra(detalles) {
    return this.http.post(apiUrl + '/addCompra', detalles);
  }

  getCompras() {
    return this.http.get(apiUrl + '/getAll');
  }

}
