import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from '../../../../servicios/usuarios.service';

@Component({
  selector: 'app-admin-usuario-info',
  templateUrl: './admin-usuario-info.component.html',
  styleUrls: ['./admin-usuario-info.component.scss']
})
export class AdminUsuarioInfoComponent implements OnInit {
  tempCoord = true;
  permisoUsuario = 0;

  respuesta: any = {
    code: 0,
    msg: '',
    detail: ''
  };

  usuario = {
    id: 1,
    credencial: { correo: '', contraseña: '' },
    foto: 'http://www.lorempixel.com/200/200',
    nombre: 'Arturo',
    apMaterno: 'Jimenez',
    apPaterno: 'Loera',
    tipo: [{ admin: true }, { coord: false }, { maestro: true }, { alumno: false }],
    fechaNac: '12-12-1994'
  };
  constructor(private route: ActivatedRoute, private usuarios: UsuariosService, private router: Router) { }
  ngOnInit() {
    this.getUsuario(this.route.snapshot.params.id);
  }
  getUsuario(id) {
    this.usuarios.getId(id).subscribe(resp => {
      this.respuesta = resp;
      this.usuario.tipo = this.respuesta.detail[0].tipo;

      this.permisoUsuario = this.usuario.tipo[0].admin == true ? 0 : 1;
      this.tempCoord = this.respuesta.detail[0].tipo[1].coord != undefined ? this.respuesta.detail[0].tipo[1].coord : false;

      this.usuario.id = this.respuesta.detail[0]._id;
      this.usuario.foto = this.respuesta.detail[0].foto;
      this.usuario.nombre = this.respuesta.detail[0].nombre;
      this.usuario.apMaterno = this.respuesta.detail[0].apMaterno;
      this.usuario.apPaterno = this.respuesta.detail[0].apPaterno;
      this.usuario.fechaNac = this.respuesta.detail[0].fechaNac;
      this.usuario.credencial = this.respuesta.detail[0].credencial;
    }, err => {
      console.log(err);
    });
  }

  cambiarEstado(tipo, cambio) {
    switch (cambio) {
      case 0:
        if (this.permisoUsuario == 0) {
          tipo = [{ admin: true }, {}, {}, {}];
        } else {
          tipo = [{}, { coord: this.tempCoord }, {}, {}];
        }
        break;
      case 1:
        tipo[1].coord = !tipo[1].coord;
        break;
      case 2:
        tipo[2].maestro = !tipo[2].maestro;
        break;
      case 3:
        tipo[3].alumno = !tipo[3].alumno;
        break;
    }
    this.usuario.tipo = tipo;
  }

  guardar() {
    this.usuarios.updateTipo(this.usuario.id, { tipoNuevo: this.usuario.tipo, credencialNuevo: this.usuario.credencial }).subscribe(resp => {
      this.router.navigate(['/admin/usuarios']);
    }, err => {
      console.log(err);
    });
  }
}
