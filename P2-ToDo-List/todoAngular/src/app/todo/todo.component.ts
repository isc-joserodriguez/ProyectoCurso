import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Todo } from '../todo';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

export interface DialogData {
  animal: string;
  name: string;
}


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  data: Todo[] = [];
  isLoadingResults = true;
  add = false;
  edit = false;
  delete = false;
  _id = '';
  detalle = false;
  nombre = '';
  descripcion = '';
  todoForm: FormGroup;

  constructor(private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.todoForm = this.formBuilder.group({
      nombreTarea: [null, Validators.required],
      descripcionTarea: [null, Validators.required]
    });
    this.getTareas();
  }

  getTareas() {
    this.api.getAllTodo().subscribe(res => {
      this.data = res.detail;
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

  agregar() {
    const tarea = { nombreTarea: this.nombre, descripcionTarea: this.descripcion };
    this.isLoadingResults = true;
    this.api.addTodo(tarea).subscribe(res => {
      this.cancelar();
      this.getTareas();
      this.isLoadingResults = false;
    }, (err) => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

  actualizar() {
    const tarea = { nombreTarea: this.nombre, descripcionTarea: this.descripcion };
    this.isLoadingResults = true;
    this.api.updateTodo(tarea, this._id).subscribe(res => {
      this.cancelar();
      this.getTareas();
      this.isLoadingResults = false;
    }, (err) => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

  eliminar() {
    this.isLoadingResults = true;
    this.api.deleteTodo(this._id).subscribe(res => {
      this.cancelar();
      this.getTareas();
      this.isLoadingResults = false;
    }, (err) => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

  cambiarEstado(id, estado) {
    const tarea = { estadoTarea: estado };
    this.isLoadingResults = true;
    this.api.updateEstadoTodo(tarea, id).subscribe(res => {
      this.cancelar();
      this.getTareas();
      this.isLoadingResults = false;
    }, (err) => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

  cancelar() {
    this.edit = false;
    this.add = false;
    this.delete = false;
    this.nombre = '';
    this.descripcion = '';
  }

  mostrarEdit(nombre, descripcion, id) {
    this.edit = true;
    this.add = false;
    this.delete = false;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this._id = id;
  }
  mostrarDelete(id) {
    this.edit = false;
    this.add = false;
    this.delete = true;
    this._id = id;
  }
}
