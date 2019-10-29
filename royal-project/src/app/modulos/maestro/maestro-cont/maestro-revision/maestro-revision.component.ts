import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CursosService } from 'src/app/servicios/cursos.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-maestro-revision',
  templateUrl: './maestro-revision.component.html',
  styleUrls: ['./maestro-revision.component.scss']
})
export class MaestroRevisionComponent implements OnInit {
  contenido = [];
  tareasCurso = [];
  idUsuario = 0;
  faltantes=0;
  temarioForm: FormGroup;

  constructor(private route: ActivatedRoute, private cursos: CursosService, private usuarios: UsuariosService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.temarioForm = this.formBuilder.group({
      unidades: this.formBuilder.array([])
    });
    this.contenido = [];
    this.tareasCurso = [];
    this.getTareas(this.route.snapshot.params.id, this.route.snapshot.params.alumno);
  }

  getTareas(curso, usuario) {
    this.temarioForm = this.formBuilder.group({
      unidades: this.formBuilder.array([])
    });
    this.contenido = [];
    this.tareasCurso = [];
    this.usuarios.getUserByRute(usuario).subscribe((user: any) => {
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
            subtemasUnidad.push({ nombreSubtema: subtema.subtema, tareas: tareasSubtema });
          });
          this.tareasCurso.push({ unidad: unidad.unidad, subtemas: subtemasUnidad });
        });
        console.log(this.tareasCurso);
        this.getFormularios();
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

}
