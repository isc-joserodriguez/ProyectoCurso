import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { Router } from '@angular/router';
import { Match } from 'src/app/helper/match.validator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-cuenta',
  templateUrl: './admin-cuenta.component.html',
  styleUrls: ['./admin-cuenta.component.scss']
})
export class AdminCuentaComponent implements OnInit {
  correoForm: FormGroup;
  passForm: FormGroup;

  errorPass = false;
  errorCorreo = false;

  hash = '';

  persona = {
    credencial: {
      correo: '',
      contraseña: ''
    }
  };

  constructor(private _snackBar: MatSnackBar, private usuario: UsuariosService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.errorPass = false;
    this.errorCorreo = false;
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
    this.usuario.getUser(id).subscribe((res: any) => {
      this.persona.credencial = res.detail[0].credencial;
      this.hash = this.persona.credencial.contraseña;
      this.correoForm = this.formBuilder.group({
        correo: [this.persona.credencial.correo, Validators.required],
        pass: ['', Validators.required]
      });
      this.passForm = this.formBuilder.group({
        actual: ['', Validators.required],
        pass: ['', Validators.required],
        passConfirm: ['', Validators.required]
      }, {
        validator: Match('pass', 'passConfirm')
      });
    });
  }

  guardarCorreo() {
    this.persona.credencial.correo = this.correoForm.value.correo;
    this.usuario.updateCredencial(localStorage.getItem('userid'), { credencial: this.persona.credencial, contra: this.hash, confirm: this.correoForm.value.pass, op: 0 }).subscribe((res: any) => {
      if (res.code == 400) {
        this.errorCorreo = true;
        this.inicializar(localStorage.getItem('userid'));
      } else {
        this.ngOnInit();
        this._snackBar.open('Correo actualizado', 'Hecho', {
          duration: 3000,
        });
      }
    });
  }

  guardarPass() {
    this.persona.credencial.contraseña = this.passForm.value.pass;
    this.usuario.updateCredencial(localStorage.getItem('userid'), { credencial: this.persona.credencial, contra: this.hash, confirm: this.passForm.value.actual, op: 1 }).subscribe((res: any) => {
      if (res.code == 400) {
        this.errorPass = true;
        this.inicializar(localStorage.getItem('userid'));
      } else {
        this.ngOnInit();
        this._snackBar.open('Contrseña actualizada', 'Hecho', {
          duration: 3000,
        });
      }
    });
  }

}
