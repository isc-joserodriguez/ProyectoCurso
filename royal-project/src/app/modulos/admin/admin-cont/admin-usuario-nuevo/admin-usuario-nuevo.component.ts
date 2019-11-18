import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';

// Convertidor fecha
import { DateConvert } from 'src/app/helper/date.convert';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-admin-usuario-nuevo',
  templateUrl: './admin-usuario-nuevo.component.html',
  styleUrls: ['./admin-usuario-nuevo.component.scss']
})
export class AdminUsuarioNuevoComponent implements OnInit {
  altaForm: FormGroup;
  persona = {
    credencial: {
      correo: '',
      contraseña: ''
    },
    fechaNac: '12-25-1990',
    nombre: '',
    apPaterno: '',
    apMaterno: '',
    sexo: 3,
    tipo: [],
    foto: 'http://www.lorempixel.com/200/200'
  };

  archivopath = 'Elige un Archivo';

  admin = false;

  constructor(private usuarios: UsuariosService, private router: Router, private auth: AuthService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.usuarios.getUser(localStorage.getItem('userid')).subscribe((usr: any) => {
      this.admin = (usr.detail[0].tipo[0].admin == null) ? false : true;
    });
    this.altaForm = this.formBuilder.group({
      altaNombre: ['', Validators.required],
      altaApPaterno: ['', Validators.required],
      altaApMaterno: ['', Validators.required],
      altaCorreo: ['', Validators.required],
      altaNac: ['', Validators.required],
      sexo: ['', Validators.required],
      altaRol: ['', Validators.required]
    });

    this.altaForm.valueChanges.subscribe((data) => {
      this.archivopath = data.altaFoto;
    });
  }

  alta() {
    this.persona.fechaNac = DateConvert(this.altaForm.value.altaNac);
    this.persona.credencial.correo = this.altaForm.value.altaCorreo;
    this.persona.credencial.contraseña = this.altaForm.value.altaNombre.substring(0, 2) +
      this.altaForm.value.altaApPaterno.substring(0, 2) + this.persona.fechaNac.replace(/-/g, '');

    console.log(this.persona.credencial.contraseña);
    this.persona.nombre = this.altaForm.value.altaNombre;
    this.persona.apPaterno = this.altaForm.value.altaApPaterno;
    this.persona.apMaterno = this.altaForm.value.altaApMaterno;
    this.persona.sexo = 3;
    this.persona.tipo = this.getVal(this.altaForm.value.altaRol);
    this.persona.sexo = this.altaForm.value.sexo;

    this.auth.signup(this.persona).subscribe((resp: any) => {
      this.router.navigate(['/admin/usuario', resp.detail._id]);
    }, err => {
      console.log(err);
    });
  }
  getVal(tipo) {
    if (tipo == 0) {
      return [{ admin: true }, {}, {}, {}];
    } else if (tipo == 1) {
      return [{}, { coord: true }, {}, {}];
    } else if (tipo == 2) {
      return [{}, {}, { maestro: true }, {}];
    } else {
      return [{}, {}, {}, { alumno: true }];
    }

  }
}
