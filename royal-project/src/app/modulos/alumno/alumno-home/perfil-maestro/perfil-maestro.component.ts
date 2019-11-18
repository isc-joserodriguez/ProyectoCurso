import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { CursosService } from 'src/app/servicios/cursos.service';

@Component({
  selector: 'app-perfil-maestro',
  templateUrl: './perfil-maestro.component.html',
  styleUrls: ['./perfil-maestro.component.scss']
})
export class PerfilMaestroComponent implements OnInit {
  infoMaestro: any = {
    nombre: '',
    apMaterno: '',
    apPaterno: '',
    resumen: '',
    fb: '',
    web: '',
    yt: '',
    in: '',
    cursoMaestro: [],
    documentos: [],
    fechaNac: '',
    foto: ''
  }

  cursosTec = [];
  cursosId = [];
  certificados = [];

  constructor(private cursos: CursosService, private route: ActivatedRoute, private router: Router, private usuarios: UsuariosService) { }

  ngOnInit() {
    this.getUsuario(this.route.snapshot.params.id);
  }
  getUsuario(id) {
    this.usuarios.getUserByRute(id).subscribe((maestro: any) => {
      this.infoMaestro = maestro.detail[0];
      this.infoMaestro.cursoMaestro.forEach(curso => {
        this.cursos.getCursoInfo(curso.ruta).subscribe((cursoInfo: any) => {
          if (cursoInfo.detail[0].categoria == 'Tecnología') {
            this.cursosTec.push(cursoInfo.detail[0]);
          } else {
            this.cursosId.push(cursoInfo.detail[0]);
          }
        });
      });
      this.infoMaestro.documentos.certificados.forEach(certificado => {
        this.certificados.push({
          nombreCurso: certificado.nombre,
          url: certificado.url
        });
      });
    });
  }
}
