import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CursosService } from 'src/app/servicios/cursos.service';

@Component({
  selector: 'app-config-temario',
  templateUrl: './config-temario.component.html',
  styleUrls: ['./config-temario.component.scss']
})
export class ConfigTemarioComponent implements OnInit {
  temario = [];
  nombreCurso = '';
  temarioForm: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, private cursos: CursosService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.temarioForm = this.formBuilder.group({
      unidades: this.formBuilder.array([])
    });
    this.infoCurso(this.route.snapshot.params.id)
  }

  infoCurso(id) {
    this.cursos.getCursoInfo(id).subscribe((res: any) => {
      this.temario = res.detail[0].contenidoCurso;
      this.nombreCurso = res.detail[0].nombreCompleto;
      this.temario.forEach((unidades, i) => {
        //Creamos formbuilder de unidad
        const unidadFormGroup = this.formBuilder.group({
          unidad: [unidades.unidad, Validators.required],
          subtemas: this.formBuilder.array([])
        });
        //Se mete al form group de unidades
        this.unidades.push(unidadFormGroup);
        unidades.subtemas.forEach((subtemas, j) => {
          //Creamos formbuilder de subtema
          const subtemaFormGroup = this.formBuilder.group({
            subtema: [subtemas.subtema, Validators.required],
            clases: this.formBuilder.array([])
          });
          //Se mete al form group de subtemas
          ((this.temarioForm.get('unidades') as FormArray).controls[i].get('subtemas') as FormArray).push(subtemaFormGroup);
          subtemas.clases.forEach((clases) => {
            const claseFormGroup = this.formBuilder.group({
              clase: [clases.clase, Validators.required],
              comentarios: [clases.comentarios],
              recursos: [clases.recursos],
              tarea: [clases.tarea],
              texto: [clases.texto],
              tipoPlantilla: [clases.tipoPlantilla],
              video: [clases.video]
            });
            (((this.temarioForm.get('unidades') as FormArray).controls[i].get('subtemas') as FormArray).controls[j].get('clases') as FormArray).push(claseFormGroup);
          });
        });
      });
    });
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
    this.temario = this.temarioForm.value.unidades;
    this.cursos.updateTemario(this.route.snapshot.params.id, { contenidoCurso: this.temario }).subscribe((res: any) => {
      this.router.navigate(['/maestro/curso/config', this.route.snapshot.params.id]);
    });
  }

  agregarClase(i, j) {
    const claseFormGroup = this.formBuilder.group({
      clase: ['Nombre clase ' + ((((this.temarioForm.get('unidades') as FormArray).controls[i].get('subtemas') as FormArray).controls[j].get('clases') as FormArray).length + 1),
      Validators.required],
      comentarios: [[]],
      recursos: [{}],
      tarea: [{}],
      texto: [''],
      tipoPlantilla: [0],
      video: ['http://vjs.zencdn.net/v/oceans.mp4']
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
}
