import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MaestrosService {

  constructor(private http: HttpClient) { }
  apiUrl = 'http://localhost:3002/personas/';

  getMaestros() {
    return this.http.get(this.apiUrl);
  }
  getMaestro(id) {
    return this.http.get(this.apiUrl + id);
  }
  addMaestro(maestro) {
    return this.http.post(this.apiUrl, maestro);
  }
  updateMaestro(id,maestro) {
    return this.http.put(this.apiUrl + id, maestro);
  }
  deleteMaestro(id) {
    return this.http.delete(this.apiUrl, id);
  }
}
