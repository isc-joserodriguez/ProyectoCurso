import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  admin = false;

  constructor(private usuarios: UsuariosService) { }

  ngOnInit() {
    this.usuarios.getUser(localStorage.getItem('userid')).subscribe((usr: any) => {
      this.admin = (usr.detail[0].tipo[0].admin == null) ? false : true;
    });
  }

}
