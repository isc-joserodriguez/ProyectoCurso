import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MaestrosService } from '../maestros.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-maestro-nuevo',
  templateUrl: './maestro-nuevo.component.html',
  styleUrls: ['./maestro-nuevo.component.scss']
})
export class MaestroNuevoComponent implements OnInit {
  maestroForm: FormGroup;
  maestroNuevo = {
    _id: '',
    apMaterno: '',
    apPaterno: '',
    tipo: [3],
    credencial: {
      contraseña: '',
      correo: ''
    },
    fechaNac: '',
    foto: '',
    nombre: '',
    paginaWeb: ''
  };
  isLoadingResults = false;
  constructor(private router: Router, private api: MaestrosService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.maestroForm = this.formBuilder.group({
      'id' : [null, Validators.required],
      'correo' : [null, Validators.required],
      'contraseña' : [null, Validators.required],
      'nombre' : [null, Validators.required],
      'apPaterno' : [null, Validators.required],
      'apMaterno' : [null, Validators.required],
      'fechaNac' : [null, Validators.required],
      'foto' : [null, Validators.required],
      'paginaWeb' : [null, Validators.required]

    });
  }

  onFormSubmit(form: NgForm) {
    this.maestroNuevo._id = form.id;
    this.maestroNuevo.apMaterno = form.apMaterno;
    this.maestroNuevo.apPaterno = form.apPaterno;
    this.maestroNuevo.tipo = [3];
    this.maestroNuevo.credencial = {
        contraseña: form.contraseña,
        correo: form.correo
      };
    this.maestroNuevo.fechaNac = form.fechaNac+"".substring(0,10);
    this.maestroNuevo.foto = form.foto;
    this.maestroNuevo.nombre = form.nombre;
    this.maestroNuevo.paginaWeb = form.paginaWeb;
    this.isLoadingResults = true;
    console.log(this.maestroNuevo);
    this.api.addMaestro(this.maestroNuevo).subscribe(res => {
      this.isLoadingResults = false;
      this.router.navigate(['/maestro-detalle', this.maestroNuevo._id]);
    }, (err) => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

}
