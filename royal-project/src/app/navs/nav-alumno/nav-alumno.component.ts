import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
import { Match } from '../../helper/match.validator';


@Component({
  selector: 'app-nav-alumno',
  templateUrl: './nav-alumno.component.html',
  styleUrls: ['./nav-alumno.component.scss']
})
export class NavAlumnoComponent implements OnInit {
  logForm: FormGroup;
  regForm: FormGroup;

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
  logueado = localStorage.getItem('token') != null;
  sexo = 3; // 1= H 2= M 3= Indef

  constructor(private router: Router, private auth: AuthService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.verificarToken();

    this.logForm = this.formBuilder.group({
      logCorreo: [null, Validators.required],
      logContrasenia: [null, Validators.required]
    });

    this.regForm = this.formBuilder.group({
      regSexo: ['', Validators.required],
      regNombre: ['', Validators.required],
      regApMaterno: ['', Validators.required],
      regApPaterno: ['', Validators.required],
      regCorreo: ['', Validators.required],
      regContrasenia: ['', Validators.required],
      regRepContrasenia: ['', Validators.required]
    }, {
        validator: Match('regContrasenia', 'regRepContrasenia')
      });

  }

  login() {
    this.persona.credencial.correo = this.logForm.value.logCorreo;
    this.persona.credencial.contraseña = this.logForm.value.logContrasenia;
    this.auth.login(this.persona).subscribe(res => {
      this.respuesta = res;
      localStorage.setItem('token', this.respuesta.detail);
      this.ngOnInit();
    }, err => {
      console.log(err);
    });
  }

  registrar() {
    this.persona.credencial.correo = this.regForm.value.regCorreo;
    this.persona.credencial.contraseña = this.regForm.value.regContrasenia;
    this.persona.nombre = this.regForm.value.regNombre;
    this.persona.apPaterno = this.regForm.value.regApPaterno;
    this.persona.apMaterno = this.regForm.value.regApMaterno;
    this.persona.sexo = this.regForm.value.regSexo;

    this.auth.signup(this.persona).subscribe(resp => {
      this.auth.login(this.persona).subscribe(res => {
        this.respuesta = res;
        localStorage.setItem('token', this.respuesta.detail);
        this.verificarToken();
      }, err => {
        console.log(err);
      });
    }, err => {
      console.log(err);
    });
  }

  verificarToken() {
    if (localStorage.getItem('token') == null) {
      this.logueado = false;
    } else {
      this.auth.infoUser(localStorage.getItem('token')).subscribe(res => {
        this.respuesta = res;
        if (this.respuesta.data.tipo[0] == 1) {
          this.router.navigate(['/admin/']);
        } else if (this.respuesta.data.tipo[1] == 1) {
          this.router.navigate(['/coord/']);
        } else if (this.respuesta.data.tipo[2] == 1) {
          this.router.navigate(['/maestro/']);
        }
        this.usuario = this.respuesta.data.nombre;
        this.logueado = true;
        this.sexo = this.respuesta.data.sexo;
      }, err => {
        console.log(err);
      });
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.ngOnInit();
  }
}
