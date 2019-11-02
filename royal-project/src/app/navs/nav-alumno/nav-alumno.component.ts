import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { Match } from 'src/app/helper/match.validator';
import { CursosService } from 'src/app/servicios/cursos.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';


@Component({
  selector: 'app-nav-alumno',
  templateUrl: './nav-alumno.component.html',
  styleUrls: ['./nav-alumno.component.scss']
})
export class NavAlumnoComponent implements OnInit {
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

  usuario = '';
  logueado = localStorage.getItem('token') != null;
  sexo = 3; // 1= H 2= M 3= Indef
  busqueda = '';
  perfilPublico = '';

  constructor(private usuarios: UsuariosService, private cursos: CursosService, private router: Router, private auth: AuthService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.verificarToken();

    this.logForm = this.formBuilder.group({
      logCorreo: [null, Validators.required],
      logContrasenia: [null, Validators.required]
    });

    this.regForm = this.formBuilder.group({
      regSexo: ['', Validators.required],
      regNombre: ['', Validators.required],
      regApMaterno: ['', Validators.required],
      regApPaterno: ['', Validators.required],
      regCorreo: ['', Validators.required],
      regContrasenia: ['', Validators.required],
      regRepContrasenia: ['', Validators.required]
    }, {
      validator: Match('regContrasenia', 'regRepContrasenia')
    });
  }
  getCursos() {
    this.cursosAlumno = [];
    console.log(localStorage.getItem('userid'));
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
      this.ngOnInit();
    }, err => {
      console.log(err);
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
        } else if (res.detail.tipo[0].admin != undefined) {
          this.router.navigate(['/admin/']);
        } else if (res.detail.tipo[1].coord != undefined) {
          this.router.navigate(['/coord/']);
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
          this.getCategorias();
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
    this.ngOnInit();
  }

  buscar() {
    this.router.navigate(['/buscar', this.busqueda.replace(/ /g, '-')]);
  }


}
