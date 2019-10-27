import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/servicios/firebase.service';
import { CursosService } from 'src/app/servicios/cursos.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-maestro-insignia-editar',
  templateUrl: './maestro-insignia-editar.component.html',
  styleUrls: ['./maestro-insignia-editar.component.scss']
})
export class MaestroInsigniaEditarComponent implements OnInit {
  insigniaForm: FormGroup;
  cursoInfo: any;

  imagen = '';

  archivo = false;
  public mensajeArchivo = 'No hay un archivo seleccionado';
  public datosFormulario = new FormData();
  public nombreArchivo = '';
  public URLPublica = '';
  public porcentaje = 0;
  public finalizado = true;

  constructor(private router: Router, private route: ActivatedRoute, private firebase: FirebaseService, private cursos: CursosService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.insigniaForm = this.formBuilder.group({
      nombreInsignia: ['', Validators.required],
      descripcionInsignia: ['', Validators.required],
      imagen: ['']
    });
    this.getCurso(this.route.snapshot.params.id);
  }

  getCurso(id) {
    this.cursos.getCursoInfo(id).subscribe((res: any) => {
      this.cursoInfo = res.detail[0];
      this.setValues();
    });
  }

  setValues() {
    this.insigniaForm.setValue({
      nombreInsignia: this.cursoInfo.insignias[this.route.snapshot.params.insignia].nombreInsignia,
      descripcionInsignia: this.cursoInfo.insignias[this.route.snapshot.params.insignia].descripcionInsignia,
      imagen: ''
    });
    this.imagen = this.cursoInfo.insignias[this.route.snapshot.params.insignia].imagen;
  }

  public seleccionarFoto(event) {
    this.archivo = true;
    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.mensajeArchivo = event.target.files[i].name;
        this.nombreArchivo = event.target.files[i].name;
        this.datosFormulario.delete('archivo');
        this.datosFormulario.append('archivo', event.target.files[i], event.target.files[i].name);
      }
    } else {
      this.mensajeArchivo = 'No hay un archivo seleccionado';
    }
  }

  public subir() {
    if (this.archivo) {
      this.finalizado = false;
      this.porcentaje = 0;
      const archivo = this.datosFormulario.get('archivo');
      const referencia = this.firebase.referenciaCloudStorage('usuario/' + localStorage.getItem('userid') + '/curso/' + this.route.snapshot.params.id + '/insignias/' + this.route.snapshot.params.insignia + this.nombreArchivo);
      const tarea = this.firebase.tareaCloudStorage('usuario/' + localStorage.getItem('userid') + '/curso/' + this.route.snapshot.params.id + '/insignias/' + this.route.snapshot.params.insignia + this.nombreArchivo, archivo);
      // Cambia el porcentaje
      tarea.percentageChanges().subscribe((porcentaje) => {
        this.porcentaje = Math.round(porcentaje);
        if (this.porcentaje == 100) {
          var currentTime = new Date().getTime();
          while (currentTime + 1000 >= new Date().getTime()) {
          }
          referencia.getDownloadURL().subscribe((URL) => {
            var imgVieja = this.cursoInfo.insignias[this.route.snapshot.params.insignia].imagen;
            this.cursoInfo.insignias[this.route.snapshot.params.insignia].nombreInsignia = this.insigniaForm.value.nombreInsignia;
            this.cursoInfo.insignias[this.route.snapshot.params.insignia].descripcionInsignia = this.insigniaForm.value.descripcionInsignia;
            this.cursoInfo.insignias[this.route.snapshot.params.insignia].imagen = URL;

            this.cursos.updateInsignias(this.route.snapshot.params.id, { insignias: this.cursoInfo.insignias }).subscribe(res => {
              if (!imgVieja.includes(this.nombreArchivo)) {
                imgVieja = imgVieja.split('insignias%2F')[1];
                imgVieja = imgVieja.split('?')[0];
                const referenciaBorrar = this.firebase.referenciaCloudStorage('usuario/' + localStorage.getItem('userid') + '/curso/' + this.route.snapshot.params.id + '/insignias/' + imgVieja);
                referenciaBorrar.delete();
                this.finalizado = true;
                this.router.navigate(['/maestro/curso/', this.route.snapshot.params.id, 'insignias']);
              } else {
                this.finalizado = true;
                this.router.navigate(['/maestro/curso/', this.route.snapshot.params.id, 'insignias']);
              }
            });
          });
        }
      });
    } else {
      this.cursoInfo.insignias[this.route.snapshot.params.insignia].nombreInsignia = this.insigniaForm.value.nombreInsignia;
      this.cursoInfo.insignias[this.route.snapshot.params.insignia].descripcionInsignia = this.insigniaForm.value.descripcionInsignia;
      this.cursos.updateInsignias(this.route.snapshot.params.id, { insignias: this.cursoInfo.insignias }).subscribe(res => {
        this.finalizado = true;
        this.router.navigate(['/maestro/curso/', this.route.snapshot.params.id, 'insignias']);
      });
    }
  }

}
