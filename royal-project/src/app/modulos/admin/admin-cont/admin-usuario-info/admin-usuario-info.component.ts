import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-admin-usuario-info',
  templateUrl: './admin-usuario-info.component.html',
  styleUrls: ['./admin-usuario-info.component.scss']
})
export class AdminUsuarioInfoComponent implements OnInit {
  tempCoord = true;
  permisoUsuario = 0;

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
    window.scrollTo(0, 0);
    this.getUsuario(this.route.snapshot.params.id);
  }
  getUsuario(id) {
    this.usuarios.getId(id).subscribe((resp: any) => {
      this.usuario.tipo = resp.detail[0].tipo;

      this.permisoUsuario = this.usuario.tipo[0].admin == true ? 0 : 1;
      this.tempCoord = resp.detail[0].tipo[1].coord != undefined ? resp.detail[0].tipo[1].coord : false;

      this.usuario.id = resp.detail[0]._id;
      this.usuario.foto = resp.detail[0].foto;
      this.usuario.nombre = resp.detail[0].nombre;
      this.usuario.apMaterno = resp.detail[0].apMaterno;
      this.usuario.apPaterno = resp.detail[0].apPaterno;
      this.usuario.fechaNac = resp.detail[0].fechaNac;
      this.usuario.credencial = resp.detail[0].credencial;
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
