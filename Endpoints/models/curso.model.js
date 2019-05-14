const mongoose = require('mongoose');

//esquema
//definir el esquema que vamos a manejar
const cursoSchema = new mongoose.Schema({
    _id:{
        type:String,
        required:true
    },
    maestro:{
        _id:{
            type:String,
            required:true
        }
    },
    nombreCompleto:{
        type:String,
        required: true
    },
    nombreCorto:{
        type:String,
        required: true
    },
    descripcionCurso:{
        type:String,
        required: true
    },
    aprendizaje:{
        type:String,
        required: true
    },
    imagen:{type:String, required:true},
    categoria:{type:String, required:true},
    subcategoria:{type:String, required:true},
    contenidoCurso:{
        introduccionVideo:{type:String,required:true},
        unidadCurso:[{
            nombreUnidad:{type:String,required:true},
            subtemas:[{
                nombreTema:{type:String,required:true},
                clases:[{
                    nombreClase:{type:String, required:true},
                    tipoPlantilla:{type:Number, required:true},
                    recursos:{type:String},//Recursos del contenido de la leccion
                    tarea:{type:String},//Recursos de la tarea
                    comentarios:[{_id:{type:String},idPersona:{type:String, required:true},comentario:{type:String, required: true},respuestas:[{_id:{type:String},idPersona:{type:String, required:true},comentario:{type:String, required: true}}]}]
                }]
            }],
            evaluacion:{type:String} //Evaluación de la unidad (opcional).
        }]
    },
    insignias:[{nombreInsignia:{type:String,required:true},descripcionInsignia:{type:String,required:true},imagen:{type:String, required:true}}],
    precio:{type:String,required:true},
    cursosRelacionados:[{_id:{type:String,required:true}}]
    
});
    
//modelo Curso
const cursoModel = mongoose.model('Curso', cursoSchema,'cursos');

//exportar
module.exports= cursoModel;