import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario-desactivado',
  templateUrl: './usuario-desactivado.component.html',
  styleUrls: ['./usuario-desactivado.component.scss']
})
export class UsuarioDesactivadoComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userid');
    this.router.navigate(['/']);
  }
}
