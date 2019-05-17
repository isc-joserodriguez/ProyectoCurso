import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MaestrosService } from '../maestros.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-maestro-detalle',
  templateUrl: './maestro-detalle.component.html',
  styleUrls: ['./maestro-detalle.component.scss']
})
export class MaestroDetalleComponent implements OnInit {
  isLoadingResults = true;
  maestro = {};
  modalRef: BsModalRef;

  constructor(private modalService: BsModalService, private route: ActivatedRoute, private api: MaestrosService, private router: Router) { 
  }

  ngOnInit() {
    this.getMaestroDetalles(this.route.snapshot.params.id);
  }
  getMaestroDetalles(id) {
    this.api.getMaestro(id).subscribe(data => {
      this.maestro = data.detail[0];
      this.maestro.fechaNac=this.maestro.fechaNac + ''.substring(0, 10);
      console.log(this.maestro);
      this.isLoadingResults = false;
    });
  }
  deleteMaestro(id) {
    this.isLoadingResults = true;
    this.api.deleteMaestro(id).subscribe(res => {
      this.isLoadingResults = false;
      this.router.navigate(['/maestros']);
    }, (err) => {
      console.log(err);
      this.isLoadingResults = false;
    }
    );
  }
  modalImg(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
  }


}
