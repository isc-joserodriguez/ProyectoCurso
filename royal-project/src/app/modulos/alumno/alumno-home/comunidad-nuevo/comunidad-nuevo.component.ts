import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComunidadService } from 'src/app/servicios/comunidad.service';

@Component({
  selector: 'app-comunidad-nuevo',
  templateUrl: './comunidad-nuevo.component.html',
  styleUrls: ['./comunidad-nuevo.component.scss']
})
export class ComunidadNuevoComponent implements OnInit {
  categoria = this.route.snapshot.params.categoria;
  iduser = localStorage.getItem('userid');
  respuesta: any = {
    code: 0,
    msg: '',
    detail: ''
  };

  preguntaForm: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, private comunidad: ComunidadService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    if (this.iduser == null) {
      this.router.navigate(['/']);
    }
    this.preguntaForm = this.formBuilder.group({
      pregunta: ['', Validators.required],
      detalles: ['', Validators.required]
    });
    this.getPregunta()

  }

  getPregunta() {
    if (localStorage.getItem('pregunta') != null) {
      this.preguntaForm.setValue({
        pregunta: localStorage.getItem('pregunta'),
        detalles: ''
      });
    }
  }

  subirPregunta() {
    const pregunta = {
      idPersona: this.iduser,
      pregunta: this.preguntaForm.value.pregunta,
      detalles: this.preguntaForm.value.detalles,
      actualizaciones: [],
      categoria: this.categoria,
      repuestas: []
    }
    this.comunidad.addPreguntaNueva(pregunta).subscribe(res => {
      this.respuesta = res;
      localStorage.removeItem('pregunta');
      this.router.navigate(['/comunidad/pregunta/', this.respuesta.detail.ruta]);
    });
  }

}
