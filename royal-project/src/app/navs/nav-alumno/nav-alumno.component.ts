import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-alumno',
  templateUrl: './nav-alumno.component.html',
  styleUrls: ['./nav-alumno.component.scss']
})
export class NavAlumnoComponent implements OnInit {
  usuario='Carlucha';
  logueado=false;

  constructor() { }

  ngOnInit() {
  }

}
