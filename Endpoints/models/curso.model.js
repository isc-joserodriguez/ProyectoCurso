const mongoose = require('mongoose');

//esquema
//definir el esquema que vamos a manejar
const cursoSchema = new mongoose.Schema({
    maestro:{
        _id:{
            type:String,
            required:true
        }
    },
    nombreCurso:{
        type:String,
        required: true
    },
    descripcionCurso:{
        type:String,
        required: true
    },
    contenidoCurso:{
        introduccion:{type:String,required:true},
        unidadCurso:[{
            nombreUnidad:{type:String,required:true},
            leccion:[{
                nombreLeccion:{type:String,required:true},
                recursos:{type:String,required:true},//Recursos del contenido de la leccion
                tarea:{type:String},//Recursos de la tarea
                estadoLeccion:{type:Number}//Estado de la leccion visto/no visto/cancelado etc.
            }],
            evaluacion:{type:String}, //Evaluación de la unidad (opcional).
            estadoUnidad:{type:Number}//Estado de la leccion visto/no visto/cancelado etc.
        }]
    }
    });
    
//modelo Curso
const personaModel = mongoose.model('Curso', cursoSchema,'cursos');

//exportar
module.exports= personaModel;
