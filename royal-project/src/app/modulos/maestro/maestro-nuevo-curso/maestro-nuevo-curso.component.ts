import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-maestro-nuevo-curso',
  templateUrl: './maestro-nuevo-curso.component.html',
  styleUrls: ['./maestro-nuevo-curso.component.scss']
})
export class MaestroNuevoCursoComponent implements OnInit {
  archivopath = 'Elige un Archivo';


  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  constructor() { }

  ngOnInit() {
  }

}
