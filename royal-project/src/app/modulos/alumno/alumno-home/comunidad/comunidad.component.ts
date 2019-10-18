import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComunidadService } from 'src/app/servicios/comunidad.service';


@Component({
  selector: 'app-comunidad',
  templateUrl: './comunidad.component.html',
  styleUrls: ['./comunidad.component.scss']
})
export class ComunidadComponent implements OnInit {
  categoria = this.route.snapshot.params.categoria;
  iduser = localStorage.getItem('userid')==null;
  respuesta: any = {
    code: 0,
    msg: '',
    detail: ''
  };

  preguntaForm: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, private comunidad: ComunidadService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.preguntaForm = this.formBuilder.group({
      pregunta: ['', Validators.required]
    });
    this.getPregunta()
  }
  getPregunta() {
    if (localStorage.getItem('pregunta') != null) {
      this.preguntaForm.setValue({
        pregunta: localStorage.getItem('pregunta')
      });
    }
  }

  hacerPregunta() {
    localStorage.setItem('pregunta', this.preguntaForm.value.pregunta);
    this.router.navigate(['/comunidad/nueva', this.categoria]);
  }

}
