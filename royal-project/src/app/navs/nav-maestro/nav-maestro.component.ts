import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-maestro',
  templateUrl: './nav-maestro.component.html',
  styleUrls: ['./nav-maestro.component.scss']
})
export class NavMaestroComponent implements OnInit, OnDestroy {

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

  notificaciones = [];
  sinLeer = 0;
  subscription: Subscription;

  perfilPublico = '';
  usuario = '';
  sexo = 3; // 1= H 2= M 3= Indef

  constructor(private router: Router, private auth: AuthService, private usuarios: UsuariosService) { }

  ngOnInit() {
    this.verificarToken();
    const source = interval(5000);
    this.subscription = source.subscribe(val => {
      if (localStorage.getItem('userid') != null) {
        this.getNotificaciones();
        this.verificarToken();
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  verificarToken() {
    if (localStorage.getItem('token') == null) {
      this.router.navigate(['/']);
    }
    this.auth.infoUser(localStorage.getItem('token')).subscribe((res: any) => {
      if (res.detail.token != undefined) {
        this.logout();
      } else if (res.detail.tipo[0].admin != undefined || res.detail.tipo[1].coord != undefined) {
        this.router.navigate(['/admin/']);
      } else if (res.detail.tipo[3].alumno != undefined) {
        this.router.navigate(['/']);
      } else {
        this.usuario = res.detail.nombre;
        this.sexo = res.detail.sexo;
        localStorage.setItem('userid', res.detail.id);
        this.usuarios.getUser(localStorage.getItem('userid')).subscribe((usuario: any) => {
          this.perfilPublico = '/maestro/perfil-publico/' + usuario.detail[0].ruta;
        });
        if (!res.detail.tipo[2].maestro) {
          this.router.navigate(['/usuario-inhabilitado']);
        }
      }
    }, err => {
      console.log(err);
    });
  }

  getNotificaciones() {
    this.usuarios.getUser(localStorage.getItem('userid')).subscribe((usuario: any) => {
      var conteo = 0;
      usuario.detail[0].notificaciones.forEach(not => {
        if (not.estado) conteo++;
      });
      if (conteo > this.sinLeer) {
        this.sinLeer = conteo;
        this.notificaciones = usuario.detail[0].notificaciones.reverse();
      }

    });

  }

  descartar(i) {
    this.notificaciones[i].estado = false;
    this.sinLeer = this.sinLeer - 1;
    this.usuarios.updateNotificaciones(localStorage.getItem('userid'), { notificaciones: this.notificaciones.reverse() }).subscribe(res => {
      this.verificarToken();
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userid');
    this.router.navigate(['/']);
  }
}
