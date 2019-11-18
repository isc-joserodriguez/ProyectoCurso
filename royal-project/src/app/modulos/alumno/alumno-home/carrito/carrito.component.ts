import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { CursosService } from 'src/app/servicios/cursos.service';
import { ComprasService } from 'src/app/servicios/compras.service';
declare var paypal;

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit, AfterViewInit {
  listaCursos = [];
  rutas = [];
  total = 0;

  @ViewChild('paypal') paypalElement: ElementRef;

  constructor(private compras: ComprasService, private router: Router, private usuarios: UsuariosService, private cursos: CursosService) { }

  ngAfterViewInit() {
    paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: 'Cursos Royal',
                amount: {
                  currency_code: 'MXN',
                  value: this.total
                }
              }
            ]
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          this.pagar();
        },
        onError: err => {
          console.log(err);
        }
      })
      .render(this.paypalElement.nativeElement);
  }

  ngOnInit() {
    this.getCursos();

  }
  getCursos() {
    this.listaCursos = [];
    this.total = 0;
    this.rutas = (localStorage.getItem('carrito') != null) ? localStorage.getItem('carrito').split('|') : [];
    this.rutas.splice(this.rutas.length - 1, 1);
    var index = 0;
    this.rutas.forEach(rutaCurso => {
      this.cursos.getCursoInfo(rutaCurso).subscribe((infoCurso: any) => {
        this.listaCursos.push({
          index: index,
          imagen: infoCurso.detail[0].imagen,
          nombre: infoCurso.detail[0].nombreCompleto,
          descripcion: infoCurso.detail[0].descripcionCurso,
          precio: infoCurso.detail[0].precio,
          ruta: infoCurso.detail[0].ruta
        });
        this.total = this.total + infoCurso.detail[0].precio;
        index = index + 1;
      });
    });
  }
  eliminar(index) {
    this.rutas.splice(index, 1);
    var temp = '';
    this.rutas.forEach(ruta => {
      temp = temp + ruta + '|';
    });
    if (temp == '') {
      localStorage.removeItem('carrito')
      this.router.navigate(['/']);
    } else {
      localStorage.setItem('carrito', temp);
      this.getCursos();
    }
  }
  pagar() {
    this.usuarios.getUser(localStorage.getItem('userid')).subscribe((infoAlumno: any) => {
      var usuario = infoAlumno.detail[0];
      var detalles: any = {
        idAdmin: -1,
        idPersona: usuario._id,
        importe: this.total,
        abonos: [],
        cursos: [],
        resto: 0,
        estado: 0
      }
      this.rutas.forEach(rutaCurso => {
        usuario.cursoAlumno.push({ ruta: rutaCurso });
        usuario.puntaje = usuario.puntaje + 100;
        detalles.cursos.push({ ruta: rutaCurso })
      });
      this.compras.addCompra(detalles).subscribe(res => {
        this.usuarios.inscribirAlumno(usuario._id, { cursoAlumno: usuario.cursoAlumno, puntaje: usuario.puntaje }).subscribe(res => {
          this.rutas.forEach(rutaCurso => {
            this.cursos.getCursoInfo(rutaCurso).subscribe((curso: any) => {
              var infoCurso = curso.detail[0];
              infoCurso.alumnosInscritos.push({ idAlumno: usuario._id });
              this.cursos.inscribirAlumno(infoCurso._id, infoCurso.alumnosInscritos).subscribe(res => {
                localStorage.removeItem('carrito')
                this.router.navigate(['/mis-cursos']);
              });
            });
          });
        });
      });
    });
  }
}
