import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { CursosService } from 'src/app/servicios/cursos.service';

@Component({
  selector: 'app-certificados',
  templateUrl: './certificados.component.html',
  styleUrls: ['./certificados.component.scss']
})
export class CertificadosComponent implements OnInit {
  certificados = [];

  constructor(private usuarios: UsuariosService, private cursos: CursosService) { }

  ngOnInit() {
    this.getCertificados(localStorage.getItem('userid'));
  }
  getCertificados(id) {
    this.usuarios.getUser(id).subscribe((usuario: any) => {
      usuario.detail[0].certificados.forEach(certificado => {
        this.cursos.getCursoInfo(certificado.ruta).subscribe((curso: any) => {
          this.certificados.push({
            nombreCurso: curso.detail[0].nombreCompleto,
            imagen: curso.detail[0].imagen,
            fecha: certificado.fecha,
            url: certificado.url
          });
        });
      });
      this.certificados = [{
        nombreCurso: 'Curso',
        imagen: 'http://www.lorempixel.com/200/200',
        fecha: Date.now(),
        url: 'http://www.google.com'
      }, {
        nombreCurso: 'Curso',
        imagen: 'http://www.lorempixel.com/200/200',
        fecha: Date.now(),
        url: 'http://www.google.com'
      }, {
        nombreCurso: 'Curso',
        imagen: 'http://www.lorempixel.com/200/200',
        fecha: Date.now(),
        url: 'http://www.google.com'
      }, {
        nombreCurso: 'Curso',
        imagen: 'http://www.lorempixel.com/200/200',
        fecha: Date.now(),
        url: 'http://www.google.com'
      }]
    });
  }


}
