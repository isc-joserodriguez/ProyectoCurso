import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const apiUrl = 'http://localhost:3002/personas';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(apiUrl + '/getAll');
  }
  updateStatus(id, status) {
    return this.http.put(apiUrl + '/editSatus/' + id, status);

  }
}
