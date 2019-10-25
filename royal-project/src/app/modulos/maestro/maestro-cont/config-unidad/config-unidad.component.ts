import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CursosService } from 'src/app/servicios/cursos.service';

@Component({
  selector: 'app-config-unidad',
  templateUrl: './config-unidad.component.html',
  styleUrls: ['./config-unidad.component.scss']
})
export class ConfigUnidadComponent implements OnInit {
  temario = [];
  nombreUnidad = '';
  unidad = this.route.snapshot.params.unidad;;
  subtemasForm: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, private cursos: CursosService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.subtemasForm = this.formBuilder.group({
      subtemas: this.formBuilder.array([])
    });
    this.infoCurso(this.route.snapshot.params.id)
  }

  infoCurso(id) {
    this.cursos.getCursoInfo(id).subscribe((res:any) => {
      this.temario = res.detail[0].contenidoCurso;
      const i = this.route.snapshot.params.unidad - 1;
      this.nombreUnidad = this.temario[i].unidad;

      this.temario[i].subtemas.forEach((subtemas, j) => {
        const subtemaFormGroup = this.formBuilder.group({
          subtema: [subtemas.subtema, Validators.required],
          clases: this.formBuilder.array([])
        });
        (this.subtemasForm.get('subtemas') as FormArray).push(subtemaFormGroup);
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
          ((this.subtemasForm.get('subtemas') as FormArray).controls[j].get('clases') as FormArray).push(claseFormGroup);
        });
      });
    });
  }

  get subtemas() {
    return this.subtemasForm.get('subtemas') as FormArray;
  }
  clases(i) {
    return (this.subtemasForm.get('subtemas') as FormArray).controls[i].get('clases') as FormArray;
  }

  subir() {
    const i = this.route.snapshot.params.unidad - 1;
    this.temario[i] = {
      subtemas: this.subtemasForm.value.subtemas,
      unidad: this.nombreUnidad
    }
    this.cursos.updateTemario(this.route.snapshot.params.id, { contenidoCurso: this.temario }).subscribe(res => {
      this.router.navigate(['/maestro/curso/config', this.route.snapshot.params.id]);
    });
  }

  agregarClase(i) {
    const claseFormGroup = this.formBuilder.group({
      clase: ['Nombre clase ' + (((this.subtemasForm.get('subtemas') as FormArray).controls[i].get('clases') as FormArray).length + 1),
      Validators.required],
      comentarios: [[]],
      recursos: [{}],
      tarea: [{}],
      texto: [''],
      tipoPlantilla: [0],
      video: ['http://vjs.zencdn.net/v/oceans.mp4']
    });
    ((this.subtemasForm.get('subtemas') as FormArray).controls[i].get('clases') as FormArray).push(claseFormGroup);
  }
  removerClase(i, j) {
    ((this.subtemasForm.get('subtemas') as FormArray).controls[i].get('clases') as FormArray).removeAt(j);
  }

  agregarSubtema() {
    const subtemaFormGroup = this.formBuilder.group({
      subtema: ['Nombre subtema ' + ((this.subtemasForm.get('subtemas') as FormArray).length + 1),
      Validators.required],
      clases: this.formBuilder.array([])
    });
    (this.subtemasForm.get('subtemas') as FormArray).push(subtemaFormGroup);
  }
  removerSubtema(i) {
    (this.subtemasForm.get('subtemas') as FormArray).removeAt(i);
  }

}
