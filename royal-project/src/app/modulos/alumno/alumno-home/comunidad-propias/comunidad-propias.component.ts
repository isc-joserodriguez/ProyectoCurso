import { Component, OnInit } from '@angular/core';
import { ComunidadService } from 'src/app/servicios/comunidad.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comunidad-propias',
  templateUrl: './comunidad-propias.component.html',
  styleUrls: ['./comunidad-propias.component.scss']
})
export class ComunidadPropiasComponent implements OnInit {

  constructor(private comunidad: ComunidadService, private formBuilder: FormBuilder, private router: Router) { }
  preguntas = [];
  preguntaForm: FormGroup;
  categoriaSelect = 'idiomas';
  ngOnInit() {
    this.preguntaForm = this.formBuilder.group({
      pregunta: ['', Validators.required]
    });
    if (localStorage.getItem('pregunta') != null) {
      this.preguntaForm.setValue({
        pregunta: localStorage.getItem('pregunta')
      });
    }
    this.getPreguntas();
  }
  getPreguntas() {
    this.comunidad.getPreguntas().subscribe((preguntas: any) => {
      preguntas.detail.forEach(pregunta => {
        if (pregunta.idPersona == localStorage.getItem('userid')) {
          this.preguntas.push(pregunta);
        }
      });;
    });
  }

  hacerPregunta() {
    localStorage.setItem('pregunta', this.preguntaForm.value.pregunta);
    this.router.navigate(['/comunidad/nueva', this.categoriaSelect]);
  }

}
