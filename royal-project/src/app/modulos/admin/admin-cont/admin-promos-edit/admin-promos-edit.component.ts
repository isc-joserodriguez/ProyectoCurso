import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PromosService } from 'src/app/servicios/promos.service';

@Component({
  selector: 'app-admin-promos-edit',
  templateUrl: './admin-promos-edit.component.html',
  styleUrls: ['./admin-promos-edit.component.scss']
})
export class AdminPromosEditComponent implements OnInit {
  promoForm: FormGroup;
  fechaForm: FormGroup;
  tipo = 0;
  estatus = false;
  codigo = '';

  constructor(private route: ActivatedRoute, private router: Router, private promos: PromosService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.promoForm = this.formBuilder.group({
      porcentaje: ['', [Validators.required, Validators.max(100), Validators.min(1)]],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      cumple: [false],
      estatus: [false]
    });

    this.fechaForm = this.formBuilder.group({
      porcentaje: ['', [Validators.required, Validators.max(100), Validators.min(1)]],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      estatus: [false]
    });
    this.getInfoPromo(this.route.snapshot.params.id);
  }

  getInfoPromo(id) {
    this.promos.getPromoById(id).subscribe((promo: any) => {
      console.log(promo.detail[0]);
      this.codigo = promo.detail[0].codigo;
      this.tipo = promo.detail[0].tipo;
      this.estatus = promo.detail[0].estatus;
      if (this.tipo == 0) {
        this.promoForm.setValue({
          porcentaje: promo.detail[0].porcentaje,
          fechaInicio: promo.detail[0].fechaInicio,
          fechaFin: promo.detail[0].fechaFin,
          cumple: promo.detail[0].cumple,
          estatus: promo.detail[0].estatus
        })

      } else {
        this.fechaForm.setValue({
          porcentaje: promo.detail[0].porcentaje,
          fechaInicio: promo.detail[0].fechaInicio,
          fechaFin: promo.detail[0].fechaFin,
          estatus: promo.detail[0].estatus
        });
      }
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
    this.promos.updatePromo(this.route.snapshot.params.id, promo).subscribe(res => {
      this.router.navigate(['/admin/promos/']);
    });
  }
}
