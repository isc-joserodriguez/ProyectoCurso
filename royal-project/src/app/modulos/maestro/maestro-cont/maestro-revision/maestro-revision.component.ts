import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CursosService } from 'src/app/servicios/cursos.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { FirebaseService } from 'src/app/servicios/firebase.service';

@Component({
  selector: 'app-maestro-revision',
  templateUrl: './maestro-revision.component.html',
  styleUrls: ['./maestro-revision.component.scss']
})
export class MaestroRevisionComponent implements OnInit {
  contenido = [];
  tareasCurso = [];
  idUsuario = 0;
  faltantes = 0;
  temarioForm: FormGroup;

  viejoCert = ''
  finalizadoCert = true;
  cambiaTarea = false;
  mensajeCert = 'No hay archivos';
  datosFormularioCert = new FormData();
  nombreCert = '';
  porcentajeCert = 0;
  certEntregado = false;
  indexCert = 0;
  infoCert: any = [];
  puntajeUser = 0;

  constructor(private firebase: FirebaseService, private route: ActivatedRoute, private cursos: CursosService, private usuarios: UsuariosService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.temarioForm = this.formBuilder.group({
      unidades: this.formBuilder.array([])
    });
    this.contenido = [];
    this.tareasCurso = [];
    this.faltantes = 0;
    this.getTareas(this.route.snapshot.params.id, this.route.snapshot.params.alumno);
  }

  getTareas(curso, usuario) {
    this.temarioForm = this.formBuilder.group({
      unidades: this.formBuilder.array([])
    });
    this.contenido = [];
    this.tareasCurso = [];
    this.faltantes = 0;
    this.usuarios.getUserByRute(usuario).subscribe((user: any) => {
      this.infoCert = user.detail[0].certificados;
      this.puntajeUser = user.detail[0].puntaje;

      this.cursos.getCursoInfo(curso).subscribe((cursoInfo: any) => {
        this.contenido = cursoInfo.detail[0].contenidoCurso;
        //Unidades
        this.contenido.forEach((unidad, numUnidad) => {
          var subtemasUnidad: any = [];
          //Subtemas
          unidad.subtemas.forEach((subtema, numSubtema) => {
            var tareasSubtema: any = [];
            //Clases
            subtema.clases.forEach((clase, numClase) => {
              if (clase.tarea.activo) {
                var entrega = false;
                var recurso: any = {};
                clase.tarea.envios.forEach(envio => {
                  if (envio.idAlumno == user.detail[0]._id) {
                    this.idUsuario = envio.idAlumno;
                    entrega = true
                    recurso = envio;
                  }
                });
                tareasSubtema.push({ nombreClase: clase.clase, instruccion: clase.tarea.instruccion, entrega: entrega, recurso: recurso, clase: numUnidad + '-' + numSubtema + '-' + numClase });
              }
            });
            subtemasUnidad.push({ nombreSubtema: subtema.subtema, tareas: tareasSubtema, expand: false });
          });
          this.tareasCurso.push({ unidad: unidad.unidad, subtemas: subtemasUnidad });
        });
        //console.log(this.tareasCurso);
        this.getFormularios();
        this.expandir();  
        this.getCertificado();
      });
    });

  }
  getFormularios() {
    this.tareasCurso.forEach((unidad, i) => {
      const unidadFormGroup = this.formBuilder.group({
        subtemas: this.formBuilder.array([])
      });
      this.unidades.push(unidadFormGroup);
      unidad.subtemas.forEach((subtema, j) => {
        const subtemaFormGroup = this.formBuilder.group({
          tareas: this.formBuilder.array([])
        });
        this.subtemas(i).push(subtemaFormGroup)
        subtema.tareas.forEach(tarea => {
          if (tarea.entrega) {
            if (tarea.recurso.estatus != 1) {
              this.faltantes++;
            }
            const entregadaFormGroup = this.formBuilder.group({
              retroalimentacion: [tarea.recurso.retroalimentacion + ' ']
            });
            this.clases(i, j).push(entregadaFormGroup);
          } else {
            const noEntregadaFormGroup = this.formBuilder.group({
              retroalimentacion: ['N/A']
            });
            this.clases(i, j).push(noEntregadaFormGroup);
            this.faltantes++;
          }
        });
      });
    });
  }
  revisar(aprobado, unidad, subtema, clase) {
    var retroalimentacion = this.clases(unidad, subtema).value[clase].retroalimentacion;
    var estatus = 0;
    if (aprobado) {
      estatus = 1;
    } else {
      estatus = 2;
    }
    var borrar, temp;
    this.contenido[unidad].subtemas[subtema].clases[clase].tarea.envios.forEach((envio, index) => {
      if (envio.idAlumno == this.idUsuario) {
        borrar = index;
        temp = envio;
      }
    });
    this.contenido[unidad].subtemas[subtema].clases[clase].tarea.envios.splice(borrar, 1);
    temp.fechaRevision = Date.now();
    temp.retroalimentacion = retroalimentacion;
    temp.estatus = estatus;
    this.contenido[unidad].subtemas[subtema].clases[clase].tarea.envios.push(temp);
    this.cursos.updateTemario(this.route.snapshot.params.id, { contenidoCurso: this.contenido }).subscribe(res => {
      this.getTareas(this.route.snapshot.params.id, this.route.snapshot.params.alumno);
    });


  }
  remover(unidad, subtema, clase) {
    var borrar, temp;
    this.contenido[unidad].subtemas[subtema].clases[clase].tarea.envios.forEach((envio, index) => {
      if (envio.idAlumno == this.idUsuario) {
        borrar = index;
        temp = envio;
      }
    });
    this.contenido[unidad].subtemas[subtema].clases[clase].tarea.envios.splice(borrar, 1);
    this.contenido[unidad].subtemas[subtema].clases[clase].tarea.envios.push({
      idAlumno: this.idUsuario,
      tarea: temp.tarea,
      nombreTarea: temp.nombreTarea,
      estatus: 0,
      fechaEntrega: temp.fechaEntrega
    });
    this.cursos.updateTemario(this.route.snapshot.params.id, { contenidoCurso: this.contenido }).subscribe(res => {
      this.getTareas(this.route.snapshot.params.id, this.route.snapshot.params.alumno);
    });


  }

  get unidades() {
    return this.temarioForm.get('unidades') as FormArray;
  }
  subtemas(i) {
    return (this.temarioForm.get('unidades') as FormArray).controls[i].get('subtemas') as FormArray;
  }
  clases(i, j) {
    return ((this.temarioForm.get('unidades') as FormArray).controls[i].get('subtemas') as FormArray).controls[j].get('tareas') as FormArray;
  }

  expandir() {
    this.tareasCurso.forEach((unidad, i) => {
      unidad.subtemas.forEach((subtema, j) => {
        subtema.tareas.forEach(tarea => {
          if (tarea.recurso.estatus == 0) {
            this.tareasCurso[i].subtemas[j].expand = true;
          }
        });
      });
    });
  }

  getCertificado() {
    console.log(this.infoCert);
    this.certEntregado = false;
    this.infoCert.forEach((certificado, index) => {
      if (certificado.ruta == this.route.snapshot.params.id) {
        this.certEntregado = true;
        this.indexCert = index;
        console.log(this.infoCert[this.indexCert]);
      }
    });
  }

  public seleccionarCert(event) {
    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.mensajeCert = `${event.target.files[i].name}`.substring(0, 9);
        this.nombreCert = event.target.files[i].name;
        this.datosFormularioCert.delete('archivo');
        this.datosFormularioCert.append('archivo', event.target.files[i], event.target.files[i].name);
      }
    } else {
      this.mensajeCert = 'No hay tarea';
    }
  }

  public eliminarCert() {
    var certTemp = this.infoCert
    certTemp.splice(this.indexCert, 1);
    this.usuarios.updateCert(this.idUsuario, { certificados: certTemp, puntaje: this.puntajeUser - 100 }).subscribe(res => {
      const referenciaBorrar = this.firebase.referenciaCloudStorage('usuario/' + this.idUsuario + '/curso/' + this.route.snapshot.params.id + '/certificado/' + this.infoCert.nombre)
      referenciaBorrar.delete().subscribe(() => {
        this.ngOnInit();
      });
    });
  }

  public subirCert() {
    this.viejoCert = this.infoCert.url;
    this.finalizadoCert = false;
    this.porcentajeCert = 0;
    const archivo = this.datosFormularioCert.get('archivo');
    const referencia = this.firebase.referenciaCloudStorage('usuario/' + this.idUsuario + '/curso/' + this.route.snapshot.params.id + '/certificado/' + this.infoCert.nombre);
    const tarea = this.firebase.tareaCloudStorage('usuario/' + this.idUsuario + '/curso/' + this.route.snapshot.params.id + '/certificado/' + this.infoCert.nombre, archivo);
    // Cambia el porcentaje
    tarea.percentageChanges().subscribe((porcentaje) => {
      this.porcentajeCert = Math.round(porcentaje);
      if (this.porcentajeCert == 100) {
        var currentTime = new Date().getTime();
        while (currentTime + 1000 >= new Date().getTime()) {
        }
        referencia.getDownloadURL().subscribe((URL) => {
          this.infoCert.push(
            {
              ruta: this.route.snapshot.params.id,
              nombre: this.nombreCert,
              url: URL
            }
          );
          this.usuarios.updateCert(this.idUsuario, { certificados: this.infoCert, puntaje: this.puntajeUser + 100 }).subscribe(res => {
            this.finalizadoCert = true;
            this.certEntregado = true;
            this.ngOnInit();
          });
        });
      }
    });

  }

}
