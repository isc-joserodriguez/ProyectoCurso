import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comunidad-propias',
  templateUrl: './comunidad-propias.component.html',
  styleUrls: ['./comunidad-propias.component.scss']
})
export class ComunidadPropiasComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

}
