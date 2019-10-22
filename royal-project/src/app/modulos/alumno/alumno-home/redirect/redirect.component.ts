import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.redirec(this.route.snapshot.params.ruta);
  }

  redirec(ruta) {
    // 1-busqueda cat
    // 2-busqueda nombre
    // 3-comunidad

    const sw = ruta.substring(0, 1);
    const tempRuta = ruta.substring(1);
    if (sw == 1) {
      this.router.navigate(['/categoria/', tempRuta]);
    } else if (sw == 2) {
      this.router.navigate(['/buscar/', tempRuta]);
    } else if (sw == 3) {
      this.router.navigate(['/comunidad/', tempRuta]);
    }
  }

}
