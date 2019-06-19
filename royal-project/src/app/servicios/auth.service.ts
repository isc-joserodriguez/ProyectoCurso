import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

import { UsuarioInterface } from '../modelos/usuario-interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  setToken(token: any) {
    throw new Error("Method not implemented.");
  }
  setUser(user: any) {
    throw new Error("Method not implemented.");
  }
  loginuser(email: string, password: string) {
    throw new Error("Method not implemented.");
  }
  constructor(private htttp: HttpClient) {}
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
}
