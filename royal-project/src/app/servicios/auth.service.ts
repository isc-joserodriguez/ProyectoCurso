import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const apiUrl = 'http://localhost:3002/personas';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credencial) {
    return this.http.post(apiUrl + '/login', credencial);
  }

  signup(credencial) {
    return this.http.post(apiUrl + '/signup', credencial);
  }

  infoUser(token) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token
      })
    };

    return this.http.get(apiUrl + '/userInfo', httpOptions);

  }

}
