import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/servicios/firebase.service';
import { CursosService } from 'src/app/servicios/cursos.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-maestro-nueva-insignia',
  templateUrl: './maestro-nueva-insignia.component.html',
  styleUrls: ['./maestro-nueva-insignia.component.scss']
})
export class MaestroNuevaInsigniaComponent implements OnInit {

  insigniaForm: FormGroup;
  cursoInfo: any;

  archivo = false;
  public mensajeArchivo = 'No hay un archivo seleccionado';
  public datosFormulario = new FormData();
  public nombreArchivo = '';
  public URLPublica = '';
  public porcentaje = 0;
  public finalizado = true;

  constructor(private router: Router, private route: ActivatedRoute, private firebase: FirebaseService, private cursos: CursosService, private formBuilder: FormBuilder) { }

  ngOnInit() {
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
    });
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
    this.finalizado = false;
    this.porcentaje = 0;
    const archivo = this.datosFormulario.get('archivo');
    const referencia = this.firebase.referenciaCloudStorage('usuario/' + localStorage.getItem('userid') + '/curso/' + this.route.snapshot.params.id + '/insignias/' + this.cursoInfo.insignias.length + this.nombreArchivo);
    const tarea = this.firebase.tareaCloudStorage('usuario/' + localStorage.getItem('userid') + '/curso/' + this.route.snapshot.params.id + '/insignias/' + this.cursoInfo.insignias.length + this.nombreArchivo, archivo);
    // Cambia el porcentaje
    tarea.percentageChanges().subscribe((porcentaje) => {
      this.porcentaje = Math.round(porcentaje);
      if (this.porcentaje == 100) {
        var currentTime = new Date().getTime();
        while (currentTime + 1000 >= new Date().getTime()) {
        }
        referencia.getDownloadURL().subscribe((URL) => {
          this.URLPublica = URL;

          this.cursoInfo.insignias.push(
            {
              nombreInsignia: this.insigniaForm.value.nombreInsignia,
              descripcionInsignia: this.insigniaForm.value.descripcionInsignia,
              imagen: URL
            }
          );
          this.cursos.updateInsignias(this.route.snapshot.params.id, { insignias: this.cursoInfo.insignias }).subscribe(res => {
            this.finalizado = true;
            this.router.navigate(['/maestro/curso/',this.route.snapshot.params.id,'insignias']);
          });
        });
      }
    });
  }

}
