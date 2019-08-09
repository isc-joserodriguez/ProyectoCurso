import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from '../../../../servicios/usuarios.service';

@Component({
  selector: 'app-admin-usuario-info',
  templateUrl: './admin-usuario-info.component.html',
  styleUrls: ['./admin-usuario-info.component.scss']
})
export class AdminUsuarioInfoComponent implements OnInit {
  permisoUsuario = 0;

  respuesta: any = {
    code: 0,
    msg: '',
    detail: ''
  };

  usuario = {
    id: 1,
    foto: 'http://www.lorempixel.com/200/200',
    nombre: 'Arturo',
    apMaterno: 'Jimenez',
    apPaterno: 'Loera',
    tipo: [0, 1, 0, 1],
    fechaNac: '12-12-1994',
    correo: 'arturo@hotmail.com',
    estatus: true
  };
  constructor(private route: ActivatedRoute, private usuarios: UsuariosService, private router: Router) { }
  ngOnInit() {
    this.getUsuario(this.route.snapshot.params.id);
  }

  getUsuario(id) {
    this.permisoUsuario = this.getTipo(this.usuario.tipo);



  }

  cambiarEstado(id) {
    console.log(id);

  }

  getTipo(tipo) {
    // 1= Admin 2=Coord 3=Maestro 4= Alumno
    if (tipo[0] == 1) {
      return 0;
    } else {
      return 1;
    }
  }
}
