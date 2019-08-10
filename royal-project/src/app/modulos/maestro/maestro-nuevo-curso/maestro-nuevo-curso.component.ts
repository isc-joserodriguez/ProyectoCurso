import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-maestro-nuevo-curso',
  templateUrl: './maestro-nuevo-curso.component.html',
  styleUrls: ['./maestro-nuevo-curso.component.scss']
})
export class MaestroNuevoCursoComponent implements OnInit {
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
