import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
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

  cursoNuevo = {
    idMaestro: localStorage.getItem('userid'),
    nombreCompleto: '',
    nombreCorto: '',
    descripcionCurso: '',
    objetivos: [],
    contenidoCurso: [],
    categoria: '',
    subcategoria: '',
    precio: 0,
  };

  generalForm: FormGroup;
  temarioForm: FormGroup;

  categorias = ['Tecnología', 'Idiomas'];
  subcategorias = [];

  constructor(private router: Router, private cursos: CursosService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.generalForm = this.formBuilder.group({
      nombreCompleto: ['', Validators.required],
      nombreCorto: ['', Validators.required],
      categoria: ['', Validators.required],
      subcategoria: ['', Validators.required],
      tipo: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', Validators.required]
    });

    this.temarioForm = this.formBuilder.group({
      objetivos: this.formBuilder.array([]),
      unidades: this.formBuilder.array([])
    });
  }

  filtrarSubcategoria(cadena) {
    this.subcategorias = [];
    const categoria = this.generalForm.value.categoria;
    this.cursos.getSubcategorias().subscribe(res => {
      this.respuesta = res;
      this.respuesta.detail.forEach(e => {
        if (e.categoria == categoria) {
          if (e.subcategoria.toLowerCase().includes(cadena.toLowerCase())) {
            this.subcategorias.push(e.subcategoria);
          }
        }
      });
      const a = [];
      new Set(this.subcategorias).forEach(e => {
        a.push(e);
      });
      this.subcategorias = a;
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
  clases(i, j) {
    return ((this.temarioForm.get('unidades') as FormArray).controls[i].get('subtemas') as FormArray).controls[j].get('clases') as FormArray;
  }

  subir() {
    this.cursoNuevo.nombreCompleto = this.generalForm.value.nombreCompleto;
    this.cursoNuevo.nombreCorto = this.generalForm.value.nombreCorto;
    this.cursoNuevo.descripcionCurso = this.generalForm.value.descripcion;
    this.cursoNuevo.objetivos = this.temarioForm.value.objetivos;
    this.cursoNuevo.contenidoCurso = this.temarioForm.value.unidades;
    this.cursoNuevo.categoria = this.generalForm.value.categoria;
    this.cursoNuevo.subcategoria = this.primeraMay(this.generalForm.value.subcategoria);
    this.cursoNuevo.precio = this.generalForm.value.precio;
    this.cursos.addCursoNuevo(this.cursoNuevo).subscribe(res => {
      this.respuesta = res;
      this.router.navigate(['/maestro/']);
    });
  }

  primeraMay(cad) {
    return cad.charAt(0).toUpperCase() + cad.slice(1);
  }

  agregarClase(i, j) {
    const claseFormGroup = this.formBuilder.group({
      clase: ['Nombre clase ' + ((((this.temarioForm.get('unidades') as FormArray).controls[i].get('subtemas') as FormArray).controls[j].get('clases') as FormArray).length + 1),
      Validators.required]
    });
    (((this.temarioForm.get('unidades') as FormArray).controls[i].get('subtemas') as FormArray).controls[j].get('clases') as FormArray).push(claseFormGroup);
  }
  removerClase(i, j, k) {
    (((this.temarioForm.get('unidades') as FormArray).controls[i].get('subtemas') as FormArray).controls[j].get('clases') as FormArray).removeAt(k);
  }

  agregarSubtema(i) {
    const subtemaFormGroup = this.formBuilder.group({
      subtema: ['Nombre subtema ' + (((this.temarioForm.get('unidades') as FormArray).controls[i].get('subtemas') as FormArray).length + 1),
      Validators.required],
      clases: this.formBuilder.array([])
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
  }
  removerUnidad(i) {
    this.unidades.removeAt(i);
  }

  agregarObjetivo() {
    const objetivoFormGroup = this.formBuilder.group({
      objetivo: ['Objetivo ' + (this.objetivos.length + 1), Validators.required]
    });
    this.objetivos.push(objetivoFormGroup);
  }
  removerObjetivo(i) {
    this.objetivos.removeAt(i);
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
}
