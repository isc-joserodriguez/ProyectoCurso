import { Component, OnInit } from '@angular/core';
import { MaestrosService } from '../maestros.service';

@Component({
  selector: 'app-maestros',
  templateUrl: './maestros.component.html',
  styleUrls: ['./maestros.component.scss']
})
export class MaestrosComponent implements OnInit {
  displayedColumns: string[] = ['tipo', 'nombre', 'apPaterno', 'apMaterno', 'fechaNac', 'paginaWeb'];
  data = [];
  isLoadingResults = true;

  constructor(private api: MaestrosService) { }


  ngOnInit() {
    this.api.getMaestros().subscribe(res => {
      this.data = res.detail;
      console.log(this.data);
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

}
