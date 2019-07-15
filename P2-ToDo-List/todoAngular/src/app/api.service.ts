import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

const apiUrl = 'http://localhost:3003/todo';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getAllTodo() {
    return this.http.get(apiUrl);
  }
  getTodo(id) {
    const url = `${apiUrl}/${id}`;
    return this.http.get(url);
  }
  addTodo(Todo) {
    return this.http.post(apiUrl, Todo);
  }
  updateTodo (Todo,id) {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, Todo);
  }
  updateEstadoTodo (Todo, id) {
    const url = `${apiUrl}/estado/${id}`;
    return this.http.put(url, Todo);
  }
  deleteTodo (id){
    const url = `${apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
