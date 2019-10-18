import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { Router } from '@angular/router';
import { Match } from 'src/app/helper/match.validator';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.scss']
})
export class CuentaComponent implements OnInit {
  correoForm: FormGroup;
  passForm: FormGroup;

  respuesta: any = {
    code: 0,
    msg: '',
    detail: ''
  };
  errorPass = false;
  errorCorreo = false;

  hash = '';

  persona = {
    credencial: {
      correo: '',
      contraseña: ''
    }
  };

  constructor(private usuario: UsuariosService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.correoForm = this.formBuilder.group({
      correo: ['', Validators.required],
      pass: ['', Validators.required]
    });
    this.passForm = this.formBuilder.group({
      actual: ['', Validators.required],
      pass: ['', Validators.required],
      passConfirm: ['', Validators.required]
    }, {
      validator: Match('pass', 'passConfirm')
    });
    this.inicializar(localStorage.getItem('userid'));
  }

  inicializar(id) {
    this.usuario.getId(id).subscribe(res => {
      this.respuesta = res;
      this.persona.credencial = this.respuesta.detail[0].credencial;
      this.hash = this.persona.credencial.contraseña;
      this.correoForm.setValue({
        correo: this.persona.credencial.correo,
        pass: ''
      });
      this.passForm.setValue({
        actual: '',
        pass: '',
        passConfirm: ''
      });
    });
    this.errorPass = false;
    this.errorCorreo = false;
  }

  guardarCorreo() {
    this.persona.credencial.correo = this.correoForm.value.correo;
    this.usuario.updateCredencial(localStorage.getItem('userid'), { credencial: this.persona.credencial, contra: this.hash, confirm: this.correoForm.value.pass, op: 0 }).subscribe(res => {
      this.respuesta = res;
      if (this.respuesta.code == 400) {
        this.errorCorreo = true;
        this.inicializar(localStorage.getItem('userid'));
      } else {
        this.ngOnInit();
      }
    });
  }

  guardarPass() {
    this.persona.credencial.contraseña = this.passForm.value.pass;
    this.usuario.updateCredencial(localStorage.getItem('userid'), { credencial: this.persona.credencial, contra: this.hash, confirm: this.passForm.value.actual, op: 1 }).subscribe(res => {
      this.respuesta = res;
      if (this.respuesta.code == 400) {
        this.inicializar(localStorage.getItem('userid'));
      } else {
        this.ngOnInit();
      }
    });
  }

}
