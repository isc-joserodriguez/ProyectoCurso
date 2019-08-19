import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-nav-maestro',
  templateUrl: './nav-maestro.component.html',
  styleUrls: ['./nav-maestro.component.scss']
})
export class NavMaestroComponent implements OnInit {
  respuesta: any = {
    code: 0,
    msg: '',
    detail: ''
  };

  persona = {
    credencial: {
      correo: '',
      contraseña: ''
    },
    nombre: '',
    apPaterno: '',
    apMaterno: '',
    sexo: 3
  };

  usuario = '';
  sexo = 3; // 1= H 2= M 3= Indef

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit() {
    this.verificarToken();
  }

  verificarToken() {
    this.auth.infoUser(localStorage.getItem('token')).subscribe(res => {
      this.respuesta = res;
      if (this.respuesta.detail.token != undefined) {
        this.logout();
      } else if (this.respuesta.detail.tipo[0].admin != undefined) {
        this.router.navigate(['/admin/']);
      } else if (this.respuesta.detail.tipo[1].coord != undefined) {
        this.router.navigate(['/coord/']);
      } else if (this.respuesta.detail.tipo[3].alumno != undefined) {
        this.router.navigate(['/']);
      }
      this.usuario = this.respuesta.detail.nombre;
      this.sexo = this.respuesta.detail.sexo;
    }, err => {
      console.log(err);
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
