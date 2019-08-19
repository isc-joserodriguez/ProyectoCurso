const mongoose = require('mongoose');

//esquema
//definir el esquema que vamos a manejar
const cursoSchema = new mongoose.Schema({
    _id: { type: Number, required: true },
    idMaestro: { type: Number, required: true },
    nombreCompleto: { type: String, required: true },
    nombreCorto: { type: String, required: true },
    descripcionCurso: { type: String, required: true },
    aprendizaje: { type: String, required: true },
    imagen: { type: String, required: true },
    categoria: { type: String, required: true },
    subcategoria: { type: String, required: true },
    contenidoCurso: {
        introduccionVideo: { type: String, required: true },
        unidadCurso: [{
            nombreUnidad: { type: String, required: true },
            subtemas: [{
                nombreTema: { type: String, required: true },
                clases: [{
                    ponderacion: { type: Number, required: true },
                    nombreClase: { type: String, required: true },
                    tipoPlantilla: { type: Number, required: true },
                    recursos: { type: String },//Recursos del contenido de la leccion
                    tarea: [{ recurso: { type: String, required: true }, envios: [{ _id: { type: String, required: true }, idAlumno: { type: String, required: true }, estatus: { type: String, required: true }, calificacion: { type: String, required: true }, fecha: { type: Date, required: true }, retroalimentacion: { type: String, required: true } }] }],//Recursos de la tarea
                    comentarios: [{ _id: { type: String }, idPersona: { type: String, required: true }, comentario: { type: String, required: true }, respuestas: [{ _id: { type: String }, idPersona: { type: String, required: true }, comentario: { type: String, required: true } }] }]
                }]
            }],
            evaluacion: { type: String } //Evaluación de la unidad (opcional).
        }]
    },
    insignias: [{ nombreInsignia: { type: String, required: true }, descripcionInsignia: { type: String, required: true }, imagen: { type: String, required: true } }],
    precio: { type: String, required: true },
    cursosRelacionados: [{ _id: { type: String, required: true } }],
    estado: { type: Number, required: true },
    royal: { type: Boolean, required: true }
});

//modelo Curso
const cursoModel = mongoose.model('Curso', cursoSchema, 'cursos');

//exportar
module.exports = cursoModel;