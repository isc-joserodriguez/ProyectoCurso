import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CursosService } from 'src/app/servicios/cursos.service';

@Component({
  selector: 'app-config-subtema',
  templateUrl: './config-subtema.component.html',
  styleUrls: ['./config-subtema.component.scss']
})
export class ConfigSubtemaComponent implements OnInit {
  temario = [];
  nombreSubtema = '';
  unidad = this.route.snapshot.params.subtema;
  subtema = this.route.snapshot.params.subtema;
  clasesForm: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, private cursos: CursosService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.clasesForm = this.formBuilder.group({
      clases: this.formBuilder.array([])
    });
    this.infoCurso(this.route.snapshot.params.id)
  }

  infoCurso(id) {
    this.cursos.getCursoInfo(id).subscribe((res: any) => {
      this.temario = res.detail[0].contenidoCurso;
      this.nombreSubtema = this.temario[this.unidad - 1].subtemas[this.subtema - 1].subtema;

      this.temario[this.unidad - 1].subtemas[this.subtema - 1].clases.forEach((clases) => {
        const claseFormGroup = this.formBuilder.group({
          clase: [clases.clase, Validators.required],
          comentarios: [clases.comentarios],
          recursos: [clases.recursos],
          tarea: [clases.tarea],
          texto: [clases.texto],
          tipoPlantilla: [clases.tipoPlantilla],
          video: [clases.video],
          evaluacion: [clases.evaluacion]
        });
        (this.clasesForm.get('clases') as FormArray).push(claseFormGroup);
      });
    });
  }

  get clases() {
    return this.clasesForm.get('clases') as FormArray;
  }

  subir() {

    this.temario[this.unidad - 1].subtemas[this.subtema - 1] = {
      clases: this.clasesForm.value.clases,
      subtema: this.nombreSubtema
    }

    this.cursos.updateTemario(this.route.snapshot.params.id, { contenidoCurso: this.temario }).subscribe(res => {
      this.router.navigate(['/maestro/curso/config', this.route.snapshot.params.id]);
    });
  }

  agregarClase() {
    const claseFormGroup = this.formBuilder.group({
      clase: ['Nombre clase ' + ((this.clasesForm.get('clases') as FormArray).length + 1),
      Validators.required],
      comentarios: [[]],
      recursos: [{}],
      tarea: [{}],
      texto: [''],
      tipoPlantilla: [0],
      video: ['http://vjs.zencdn.net/v/oceans.mp4'],
      evaluacion: [false]
    });
    (this.clasesForm.get('clases') as FormArray).push(claseFormGroup);
  }
  removerClase(i) {
    (this.clasesForm.get('clases') as FormArray).removeAt(i);
  }

}
