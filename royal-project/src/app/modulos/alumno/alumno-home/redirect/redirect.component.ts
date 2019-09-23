import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Route) { }

  ngOnInit() {
    //this.redirect(this.route.snapshot.params.redireccionar);
  }
  redirect(ruta) {
    /* const opciones = ruta.split('-');
    if(opciones[0]=='cat'){

    }else{
      //this.router.navi
    } */

  }

}
