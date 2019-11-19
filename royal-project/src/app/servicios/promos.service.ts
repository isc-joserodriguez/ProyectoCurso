import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const apiUrl = environment.urlMongo + 'promos';

@Injectable({
  providedIn: 'root'
})
export class PromosService {

  constructor(private http: HttpClient) { }

  addPromo(promo) {
    return this.http.post(apiUrl + '/addPromo', promo);
  }

  updatePromo(id, info) {
    return this.http.put(apiUrl + '/updatePromo/' + id, info);
  }

  getPromo(codigo) {
    return this.http.get(apiUrl + '/getPromo/' + codigo);
  }

  getPromoById(id) {
    return this.http.get(apiUrl + '/getPromoById/' + id);
  }

  getPromos() {
    return this.http.get(apiUrl + '/getPromos/');
  }

  updateUsos(id, info) {
    return this.http.put(apiUrl + '/updateUsos/' + id, info);
  }

}
