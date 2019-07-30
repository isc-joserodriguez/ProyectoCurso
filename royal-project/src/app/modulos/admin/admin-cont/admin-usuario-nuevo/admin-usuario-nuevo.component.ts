import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../servicios/auth.service';

// Convertidor fecha
import { DateConvert } from '../../../../helper/date.convert';

@Component({
  selector: 'app-admin-usuario-nuevo',
  templateUrl: './admin-usuario-nuevo.component.html',
  styleUrls: ['./admin-usuario-nuevo.component.scss']
})
export class AdminUsuarioNuevoComponent implements OnInit {
  altaForm: FormGroup;

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
    fechaNac: '12-25-1990',
    nombre: '',
    apPaterno: '',
    apMaterno: '',
    sexo: 3,
    tipo: 4,
    foto: 'http://www.lorempixel.com/200/200'
  };

  archivopath = 'Elige un Archivo';

  constructor(private router: Router, private auth: AuthService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.altaForm = this.formBuilder.group({
      altaNombre: ['', Validators.required],
      altaApPaterno: ['', Validators.required],
      altaApMaterno: ['', Validators.required],
      altaCorreo: ['', Validators.required],
      altaNac: ['', Validators.required],
      altaFoto: ['', Validators.required],
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
      this.altaForm.value.altaApPaterno.substring(0, 2) + this.altaForm.value.altaApMaterno.substring(0, 2) +
      this.persona.fechaNac.replace(/-/g, '');
    this.persona.nombre = this.altaForm.value.altaNombre;
    this.persona.apPaterno = this.altaForm.value.altaApPaterno;
    this.persona.apMaterno = this.altaForm.value.altaApMaterno;
    this.persona.sexo = 3;
    this.persona.tipo = this.altaForm.value.altaRol;
    this.persona.foto = this.altaForm.value.altaFoto;

    console.log(this.persona);

    this.auth.signup(this.persona).subscribe(resp => {
      this.respuesta = resp;
    }, err => {
      console.log(err);
    });
  }
}
