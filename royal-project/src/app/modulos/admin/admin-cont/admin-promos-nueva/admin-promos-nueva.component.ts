import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PromosService } from 'src/app/servicios/promos.service';

@Component({
  selector: 'app-admin-promos-nueva',
  templateUrl: './admin-promos-nueva.component.html',
  styleUrls: ['./admin-promos-nueva.component.scss']
})
export class AdminPromosNuevaComponent implements OnInit {

  promoForm: FormGroup;
  fechaForm: FormGroup;
  tipo = 0;

  constructor(private router: Router, private promos: PromosService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.promoForm = this.formBuilder.group({
      codigo: ['', Validators.required],
      porcentaje: ['', [Validators.required, Validators.max(100), Validators.min(1)]],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      cumple: [false]
    });

    this.fechaForm = this.formBuilder.group({
      porcentaje: ['', [Validators.required, Validators.max(100), Validators.min(1)]],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required]
    });
  }

  public guardar() {
    var promo: any = {};
    if (this.tipo == 0) {
      promo = this.promoForm.value;
    } else {
      promo = this.fechaForm.value;
    }
    promo.fechaFin = new Date(promo.fechaFin).getTime() + (23.9 * 60 * 60 * 1000);
    promo.tipo = this.tipo;
    this.promos.addPromo(promo).subscribe(res => {
      this.router.navigate(['/admin/promos/']);
    });
  }
}
