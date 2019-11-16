import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-nav-administrador',
  templateUrl: './nav-administrador.component.html',
  styleUrls: ['./nav-administrador.component.scss']
})
export class NavAdministradorComponent implements OnInit {

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
    this.auth.infoUser(localStorage.getItem('token')).subscribe((res: any) => {
      if (res.detail.token != undefined) {
        this.logout();
      } else if (res.detail.tipo[1].coord != undefined) {
        this.router.navigate(['/coord/']);
      } else if (res.detail.tipo[2].maestro != undefined) {
        this.router.navigate(['/maestro/']);
      } else if (res.detail.tipo[3].alumno != undefined) {
        this.router.navigate(['/']);
      }
      this.usuario = res.detail.nombre;
      this.sexo = res.detail.sexo;
      localStorage.setItem('userid', res.detail.id);
      
    }, err => {
      console.log(err);
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userid');
    this.router.navigate(['/']);
  }
}
