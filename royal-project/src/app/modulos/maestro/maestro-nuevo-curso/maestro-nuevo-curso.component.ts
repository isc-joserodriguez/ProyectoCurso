import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
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
  temarioForm: FormGroup;

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
      tipo: ['', Validators.required]
    });
    this.descripcionForm = this.formBuilder.group({
      descripcion: ['', Validators.required],
      fotoCurso: ['', Validators.required],
      videoCurso: ['', Validators.required]
    });

    this.temarioForm = this.formBuilder.group({
      objetivos: this.formBuilder.array([]),
      unidades: this.formBuilder.array([])
    });
  }

  get objetivos() {
    return this.temarioForm.get('objetivos') as FormArray;
  }

  get unidades() {
    return this.temarioForm.get('unidades') as FormArray;
  }

  subtemas(i) {
    return (this.temarioForm.get('unidades') as FormArray).controls[i].get('subtemas') as FormArray;
  }

  imprimir() {
    console.log(this.generalForm.value);
    console.log(this.descripcionForm.value);
    console.log(this.temarioForm.value);
  }

  agregarSubtema(i) {
    const subtemaFormGroup = this.formBuilder.group({
      subtema: ['Nombre subtema ' + (((this.temarioForm.get('unidades') as FormArray).controls[i].get('subtemas') as FormArray).length + 1),
      Validators.required]
    });
    ((this.temarioForm.get('unidades') as FormArray).controls[i].get('subtemas') as FormArray).push(subtemaFormGroup);
  }
  removerSubtema(i, j) {
    ((this.temarioForm.get('unidades') as FormArray).controls[i].get('subtemas') as FormArray).removeAt(j);
  }

  agregarUnidad() {
    const unidadFormGroup = this.formBuilder.group({
      unidad: ['Nombre de unidad ' + (this.unidades.length + 1), Validators.required],
      subtemas: this.formBuilder.array([])
    });
    this.unidades.push(unidadFormGroup);
    // console.log(this.objetivos);
  }
  removerUnidad(i) {
    this.unidades.removeAt(i);
  }

  agregarObjetivo() {
    const objetivoFormGroup = this.formBuilder.group({
      objetivo: ['Objetivo ' + (this.objetivos.length + 1), Validators.required]
    });
    this.objetivos.push(objetivoFormGroup);
    // console.log(this.objetivos);
  }
  removerObjetivo(i) {
    this.objetivos.removeAt(i);
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
