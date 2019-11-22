import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { Match } from 'src/app/helper/match.validator';
import { CursosService } from 'src/app/servicios/cursos.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { interval, Subscription } from 'rxjs';
import { PromosService } from 'src/app/servicios/promos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DateConvert } from 'src/app/helper/date.convert';



@Component({
  selector: 'app-nav-alumno',
  templateUrl: './nav-alumno.component.html',
  styleUrls: ['./nav-alumno.component.scss']
})
export class NavAlumnoComponent implements OnInit, OnDestroy {
  passErr = false;
  correcto = false;

  logForm: FormGroup;
  regForm: FormGroup;

  categoriasTec = [];
  categoriasLen = [];

  persona = {
    credencial: {
      correo: '',
      contraseña: ''
    },
    nombre: '',
    apPaterno: '',
    apMaterno: '',
    sexo: 3
  };

  cursosAlumno = [];

  notificaciones = [];
  sinLeer = 0;
  subscription: Subscription;

  usuario = '';
  logueado = localStorage.getItem('token') != null;
  sexo = 3; // 1= H 2= M 3= Indef
  busqueda = '';
  perfilPublico = '';

  constructor(private _snackBar: MatSnackBar, private promos: PromosService, private usuarios: UsuariosService, private cursos: CursosService, private router: Router, private auth: AuthService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.verificarToken();
    this.getCategorias();
    this.getPromosFecha();

    const source = interval(5000);
    this.subscription = source.subscribe(val => {
      if (localStorage.getItem('userid') != null) {
        this.getNotificaciones();
        this.verificarToken();
        console.log('alumno')
      }
    });

    this.logForm = this.formBuilder.group({
      logCorreo: [null, [Validators.required, Validators.email]],
      logContrasenia: [null, Validators.required]
    });

    this.regForm = this.formBuilder.group({
      regSexo: ['', Validators.required],
      regNombre: ['', Validators.required],
      regApMaterno: ['', Validators.required],
      regApPaterno: ['', Validators.required],
      regCorreo: ['', [Validators.required, Validators.email]],
      regContrasenia: ['', Validators.required],
      regRepContrasenia: ['', Validators.required]
    }, {
      validator: Match('regContrasenia', 'regRepContrasenia')
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getPromosFecha() {
    this.promos.getPromos().subscribe((promos: any) => {
      promos.detail.forEach(promo => {
        if (promo.estatus && promo.tipo == 1 && new Date(promo.fechaInicio).getTime() < Date.now() && new Date(promo.fechaFin).getTime() > Date.now()) {
          var mensaje = '¡Aprovecha el ' + promo.porcentaje + '% de descuento hasta el ' + DateConvert(promo.fechaFin) + '!'
          this._snackBar.open(mensaje, 'Cerrar', {
            duration: 10000,
          });
        }
      });
    });
  }
  getCursos() {
    this.cursosAlumno = [];
    this.usuarios.getUser(localStorage.getItem('userid')).subscribe((usuario: any) => {
      this.perfilPublico = '/alumno/perfil-publico/' + usuario.detail[0].ruta;
      usuario.detail[0].cursoAlumno.forEach(curso => {
        this.cursos.getCursoInfo(curso.ruta).subscribe((cursoInfo: any) => {
          this.cursosAlumno.push({
            imagen: cursoInfo.detail[0].imagen,
            nombre: cursoInfo.detail[0].nombreCorto,
            ruta: cursoInfo.detail[0].ruta
          });
        });
      });
    });
  }
  getNotificaciones() {
    this.usuarios.getUser(localStorage.getItem('userid')).subscribe((usuario: any) => {
      var conteo = 0;
      usuario.detail[0].notificaciones.forEach(not => {
        if (not.estado) conteo++;// = conteo + 1;
      });
      if (conteo > this.sinLeer) {
        this.sinLeer = conteo;
        this.notificaciones = usuario.detail[0].notificaciones.reverse();
      }

    });

  }
  descartar(i) {
    this.notificaciones[i].estado = false;
    this.sinLeer = this.sinLeer - 1;
    this.usuarios.updateNotificaciones(localStorage.getItem('userid'), { notificaciones: this.notificaciones.reverse() }).subscribe(res => {
      this.getNotificaciones();
    });
  }
  getCategorias() {
    this.categoriasTec = [];
    this.categoriasLen = [];
    this.cursos.getSubcategorias().subscribe((res: any) => {
      res.detail.forEach(e => {
        if (e.categoria == 'Tecnología') {
          this.categoriasTec.push(e.subcategoria);
        } else {
          this.categoriasLen.push(e.subcategoria);
        }
      });
      var a = [];
      new Set(this.categoriasTec).forEach(e => {
        a.push(e);
      });
      this.categoriasTec = (a.length == 0) ? ['No disponible'] : a;
      a = [];
      new Set(this.categoriasLen).forEach(e => {
        a.push(e);
      });
      this.categoriasLen = (a.length == 0) ? ['No disponible'] : a;

    });
  }

  login() {
    this.persona.credencial.correo = this.logForm.value.logCorreo;
    this.persona.credencial.contraseña = this.logForm.value.logContrasenia;
    this.auth.login(this.persona).subscribe((res: any) => {
      localStorage.setItem('token', res.detail);
      this.correcto = true;
    }, err => {
      this.passErr = true;
    });
  }

  registrar() {
    this.persona.credencial.correo = this.regForm.value.regCorreo;
    this.persona.credencial.contraseña = this.regForm.value.regContrasenia;
    this.persona.nombre = this.regForm.value.regNombre;
    this.persona.apPaterno = this.regForm.value.regApPaterno;
    this.persona.apMaterno = this.regForm.value.regApMaterno;
    this.persona.sexo = this.regForm.value.regSexo;

    this.auth.signup(this.persona).subscribe(resp => {
      this.auth.login(this.persona).subscribe((res: any) => {
        localStorage.setItem('token', res.detail);
        this.ngOnInit();
      }, err => {
        console.log(err);
      });
    }, err => {
      console.log(err);
    });
  }

  verificarToken() {
    if (localStorage.getItem('token') == null) {
      this.logueado = false;
    } else {
      this.auth.infoUser(localStorage.getItem('token')).subscribe((res: any) => {
        localStorage.setItem('userid', res.detail.id);
        if (res.detail.token != undefined) {
          this.logout();
        } else if (res.detail.tipo[0].admin != undefined || res.detail.tipo[1].coord != undefined) {
          this.router.navigate(['/admin/']);
        } else if (res.detail.tipo[2].maestro != undefined) {
          if (!res.detail.tipo[2].maestro) {
            this.router.navigate(['/usuario-inhabilitado']);
          }
          this.router.navigate(['/maestro/']);
        } else {
          this.usuario = res.detail.nombre;
          this.logueado = true;
          this.sexo = res.detail.sexo;
          localStorage.setItem('userid', res.detail.id);
          if (!res.detail.tipo[3].alumno) {
            this.router.navigate(['/usuario-inhabilitado']);
          }
          this.getCursos();
        }
      }, err => {
        console.log(err);
      });
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userid');
    this.router.navigate(['/']);
    this.correcto = false;
    this.ngOnInit();
  }

  buscar() {
    this.router.navigate(['/buscar', this.busqueda.replace(/ /g, '-')]);
  }


}
