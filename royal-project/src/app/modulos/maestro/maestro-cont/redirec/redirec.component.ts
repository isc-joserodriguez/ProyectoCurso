import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-redirec',
  templateUrl: './redirec.component.html',
  styleUrls: ['./redirec.component.scss']
})
export class RedirecComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    switch (this.route.snapshot.params.ruta) {
      case '1':
        this.router.navigate(['/maestro/curso/config/', this.route.snapshot.params.id]);
        break;
      default:
        const nuevaRuta = (this.route.snapshot.params.ruta + '').split('-');
        this.router.navigate(['/maestro/curso/config/', this.route.snapshot.params.id, 'temario', nuevaRuta[0], nuevaRuta[1], nuevaRuta[2]]);
    }
  }

}
