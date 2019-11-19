import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { CursosService } from 'src/app/servicios/cursos.service';
import { ComprasService } from 'src/app/servicios/compras.service';
import { PromosService } from 'src/app/servicios/promos.service';
import { DateConvert } from 'src/app/helper/date.convert';
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
  codigo = '';
  error = '';
  descuento = false;
  importeDescuento = 0;
  usosCod = 0;
  codigosUsados = [];
  promoFecha: any = {};
  divBotones = false;
  divCodigo = false;
  cod = false;
  fechaNac: any;

  @ViewChild('paypal') paypalElement: ElementRef;

  constructor(private promos: PromosService, private compras: ComprasService, private router: Router, private usuarios: UsuariosService, private cursos: CursosService) { }

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
    this.getCodigosUsados();
    this.getPromosFecha();
    this.getCursos();
  }
  getPromosFecha() {
    this.promos.getPromos().subscribe((promos: any) => {
      promos.detail.forEach(promo => {
        if (promo.estatus && promo.tipo == 1 && new Date(promo.fechaInicio).getTime() < Date.now() && new Date(promo.fechaFin).getTime() > Date.now()) {
          this.promoFecha = promo;
          this.divBotones = true;
        }
      });
      if (!this.divBotones) this.divCodigo = true;
    });
  }
  activarCodigos() {
    this.divBotones = false;
    this.divCodigo = true;
  }

  getCodigosUsados() {
    this.usuarios.getUser(localStorage.getItem('userid')).subscribe(((usuarioInfo: any) => {
      this.fechaNac = usuarioInfo.detail[0].fechaNac;
      this.codigosUsados = usuarioInfo.detail[0].codigos;
    }));
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
                if (this.cod) {
                  this.promos.updateUsos(this.codigo, { usos: this.usosCod + 1 }).subscribe(res => {
                    this.usuarios.getUser(localStorage.getItem('userid')).subscribe(((usuarioInfo: any) => {
                      usuarioInfo.detail[0].codigos.push(this.codigo);
                      this.usuarios.updateCodigos(localStorage.getItem('userid'), { codigos: usuarioInfo.detail[0].codigos }).subscribe(res => {
                        localStorage.removeItem('carrito');
                        this.router.navigate(['/mis-cursos']);
                      });
                    }));
                  });
                } else {
                  localStorage.removeItem('carrito');
                  this.router.navigate(['/mis-cursos']);
                }
              });
            });
          });
        });
      });
    });
  }

  aplicarFecha() {
    this.descuento = true;
    this.importeDescuento = this.total * (this.promoFecha.porcentaje / 100)
    this.total = this.total * ((100 - this.promoFecha.porcentaje) / 100);
    this.error = '';
    this.divBotones = false;
  }

  aplicarCodigo() {
    this.promos.getPromo(this.codigo).subscribe((promo: any) => {
      if (promo.detail[0] != undefined) {
        if (!this.codigosUsados.includes(this.codigo)) {

          if (promo.detail[0].estatus && new Date(promo.detail[0].fechaInicio).getTime() < Date.now() && new Date(promo.detail[0].fechaFin).getTime() > Date.now()) {
            if (!promo.detail[0].cumple) {
              this.descuento = true;
              this.usosCod = promo.detail[0].usos;
              this.importeDescuento = this.total * (promo.detail[0].porcentaje / 100)
              this.total = this.total * ((100 - promo.detail[0].porcentaje) / 100);
              this.error = '';
              this.cod = true;
            } else {
              if (DateConvert(this.fechaNac).substring(0, 5) == DateConvert(new Date() + '').substring(0, 5)) {
                this.descuento = true;
                this.usosCod = promo.detail[0].usos;
                this.importeDescuento = this.total * (promo.detail[0].porcentaje / 100)
                this.total = this.total * ((100 - promo.detail[0].porcentaje) / 100);
                this.error = '';
                this.cod = true;
              } else {
                this.error = 'Guardalo para tu cumpleaños';
              }
            }

          } else {
            this.error = 'Código no disponible';
          }
        } else {
          this.error = 'Ya usaste este código';
        }
      } else {
        this.error = 'No se encontró el código';
      }
    });
  }
}
