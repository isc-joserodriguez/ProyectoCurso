import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from '../../../../../../servicios/usuarios.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  respuesta: any = {
    code: 0,
    msg: '',
    detail: ''
  };
  perfilForm: FormGroup;

  constructor(private usuario: UsuariosService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.perfilForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apPaterno: ['', Validators.required],
      apMaterno: ['', Validators.required],
      sexo: ['', Validators.required],
      fechaNac: ['', Validators.required],
      web: [''],
      fb: [''],
      yt: [''],
      in: [''],
      cv: ['', Validators.required],
      foto: ['']
    });

    this.getUser(localStorage.getItem('userid'));
  }

  getUser(id) {
    this.usuario.getUser(id).subscribe(user => {
      this.respuesta = user;
      console.log(user);
      this.perfilForm.setValue({
        nombre: this.respuesta.detail[0].nombre,
        apPaterno: this.respuesta.detail[0].apPaterno,
        apMaterno: this.respuesta.detail[0].apMaterno,
        sexo: this.respuesta.detail[0].sexo,
        fechaNac: this.respuesta.detail[0].fechaNac,
        web: this.respuesta.detail[0].web,
        fb: this.respuesta.detail[0].fb,
        yt: this.respuesta.detail[0].yt,
        in: this.respuesta.detail[0].in,
        cv: this.respuesta.detail[0].resumen,
        foto: ''
      });
    });
  }
  guardar() {
    const datos = {
      nombre: this.perfilForm.value.nombre,
      apPaterno: this.perfilForm.value.apPaterno,
      apMaterno: this.perfilForm.value.apMaterno,
      sexo: this.perfilForm.value.sexo,
      fechaNac: this.perfilForm.value.fechaNac,
      foto: this.perfilForm.value.foto,
      web: this.perfilForm.value.web,
      fb: this.perfilForm.value.fb,
      yt: this.perfilForm.value.yt,
      in: this.perfilForm.value.in,
      resumen: this.perfilForm.value.cv
    };
    this.usuario.updateDatos(localStorage.getItem('userid'), datos).subscribe(res => { });
  }
}
