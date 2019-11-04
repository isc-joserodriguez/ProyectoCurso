import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-nav',
  templateUrl: './perfil-nav.component.html',
  styleUrls: ['./perfil-nav.component.scss']
})
export class PerfilNavComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('token') == undefined) {
      this.router.navigate(['/']);
    }
  }

}
