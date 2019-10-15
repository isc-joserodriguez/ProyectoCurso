import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mis-cursos',
  templateUrl: './mis-cursos.component.html',
  styleUrls: ['./mis-cursos.component.scss']
})
export class MisCursosComponent implements OnInit {
  p: number = 1;

  constructor() { }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

}
