import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MaestrosService } from '../maestros.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-maestro-editar',
  templateUrl: './maestro-editar.component.html',
  styleUrls: ['./maestro-editar.component.scss']
})
export class MaestroEditarComponent implements OnInit {
  maestroForm: FormGroup;
  _id = '0';
  maestroEdit = {
    apMaterno: '',
    apPaterno: '',
    fechaNac: '',
    foto: '',
    nombre: '',
    paginaWeb: ''
  };
  isLoadingResults = false;
  constructor(private router: Router, private route: ActivatedRoute, private api: MaestrosService, private formBuilder: FormBuilder) { }


  ngOnInit() {
    this.getMaestro(this.route.snapshot.params.id);
    this.maestroForm = this.formBuilder.group({
      'nombre' : [null, Validators.required],
      'apPaterno' : [null, Validators.required],
      'apMaterno' : [null, Validators.required],
      'fechaNac' : [null, Validators.required],
      'foto' : [null, Validators.required],
      'paginaWeb' : [null, Validators.required]
    });
  }
  getMaestro(id) {
    this.api.getMaestro(id).subscribe(data => {
      
      this._id = data.detail[0]._id;
      this.maestroForm.setValue({
        nombre : data.detail[0].nombre,
        apPaterno : data.detail[0].apPaterno,
        apMaterno : data.detail[0].apMaterno,
        fechaNac : data.detail[0].fechaNac,
        foto : data.detail[0].foto,
        paginaWeb : data.detail[0].paginaWeb
      });
    });
  }

  onFormSubmit(form:NgForm) {
    this.isLoadingResults = true;
    this.maestroEdit._id = this._id;
    this.maestroEdit.apMaterno = form.apMaterno;
    this.maestroEdit.apPaterno = form.apPaterno;
    this.maestroEdit.tipo = [3];
    this.maestroEdit.fechaNac = form.fechaNac;
    this.maestroEdit.foto = form.foto;
    this.maestroEdit.nombre = form.nombre;
    this.maestroEdit.paginaWeb = form.paginaWeb;

    this.api.updateMaestro(this._id, this.maestroEdit).subscribe(res => {
      this.isLoadingResults = false;
      this.router.navigate(['/maestro-detalle', this._id]);
    }, (err) => {
      console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  maestroDetalle() {
    this.router.navigate(['/maestro-detalle', this._id]);
  }
  

}
