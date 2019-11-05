import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
export class CarritoComponent implements OnInit {
  listaCursos = [];
  rutas = [];
  total = 0;

  @ViewChild('paypal') paypalElement: ElementRef;
  product = {
    price: 777.77,
    description: 'used couch, decent condition',
    img: 'assets/couch.jpg'
  };
  paidFor = false;
  constructor(private compras: ComprasService, private router: Router, private usuarios: UsuariosService, private cursos: CursosService) { }

  ngOnInit() {
    this.getCursos();
    paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: this.product.description,
                amount: {
                  currency_code: 'USD',
                  value: this.product.price
                }
              }
            ]
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          this.paidFor = true;
          console.log(order);
        },
        onError: err => {
          console.log(err);
        }
      })
      .render(this.paypalElement.nativeElement);
  }
  getCursos() {
    this.listaCursos = [];
    this.total = 0;
    this.rutas = localStorage.getItem('carrito').split('|');
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
      console.log(temp);
    });
    if (temp == '') {
      localStorage.removeItem('carrito')
      this.router.navigate(['/']);
    } else {
      console.log(temp);
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
