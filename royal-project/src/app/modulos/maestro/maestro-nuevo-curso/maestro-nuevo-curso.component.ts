import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CursosService } from '../../../servicios/cursos.service';


@Component({
  selector: 'app-maestro-nuevo-curso',
  templateUrl: './maestro-nuevo-curso.component.html',
  styleUrls: ['./maestro-nuevo-curso.component.scss']
})
export class MaestroNuevoCursoComponent implements OnInit {
  step = 0;

  respuesta: any = {
    code: 0,
    msg: '',
    detail: ''
  };

  generalForm: FormGroup;
  descripcionForm: FormGroup;

  categorias = ['Tecnología', 'Idiomas'];
  subcategorias = ['cat1', 'cat2', 'nueva', 'anterior', 'Resto'];

  fotoPath = 'Selecciona foto';
  videoPath = 'Selecciona video';

  constructor(private router: Router, private cursos: CursosService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.generalForm = this.formBuilder.group({
      nombreCompleto: ['', Validators.required],
      nombreCorto: ['', Validators.required],
      categoria: ['', Validators.required],
      subcategoria: ['', Validators.required],
      tipo: ['', Validators.required],
    });
    this.descripcionForm = this.formBuilder.group({
      descripcion: ['', Validators.required],
      fotoCurso: ['', Validators.required],
      videoCurso: ['', Validators.required]
    });
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
    console.log(this.descripcionForm);
  }

  prevStep() {
    this.step--;
  }

}
