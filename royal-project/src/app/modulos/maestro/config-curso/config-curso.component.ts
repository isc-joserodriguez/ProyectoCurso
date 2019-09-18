import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-config-curso',
  templateUrl: './config-curso.component.html',
  styleUrls: ['./config-curso.component.scss']
})
export class ConfigCursoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

}
