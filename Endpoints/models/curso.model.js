const mongoose = require('mongoose');

//esquema
//definir el esquema que vamos a manejar
const cursoSchema = new mongoose.Schema({
    _id: { type: Number, required: true },
    idMaestro: { type: Number, required: true },
    nombreCompleto: { type: String, required: true },
    nombreCorto: { type: String, required: true },
    descripcionCurso: { type: String, required: true },
    objetivos: { type: Array, required: true },
    imagen: { type: String },
    categoria: { type: String, required: true },
    subcategoria: { type: String, required: true },
    contenidoCurso: {
        introduccionVideo: { type: String },
        unidadCurso: [{
            nombreUnidad: { type: String },
            subtemas: [{
                nombreTema: { type: String },
                clases: [{
                    ponderacion: { type: Number },
                    nombreClase: { type: String },
                    tipoPlantilla: { type: Number },
                    recursos: { type: String },//Recursos del contenido de la leccion
                    tarea: [{ recurso: { type: String }, envios: [{ _id: { type: String }, idAlumno: { type: String }, estatus: { type: String }, calificacion: { type: String }, fecha: { type: Date }, retroalimentacion: { type: String } }] }],//Recursos de la tarea
                    comentarios: [{ _id: { type: String }, idPersona: { type: String }, comentario: { type: String }, respuestas: [{ _id: { type: String }, idPersona: { type: String }, comentario: { type: String } }] }]
                }]
            }],
            evaluacion: { type: String } //Evaluación de la unidad (opcional).
        }]
    },
    insignias: [{ nombreInsignia: { type: String, required: true }, descripcionInsignia: { type: String, required: true }, imagen: { type: String, required: true } }],
    precio: { type: String },
    cursosRelacionados: [{ _id: { type: String, required: true } }],
    estado: { type: String, default: 1 }, //1:En revisión, 2:Aceptado, 3:Rechazado
    publicación: { type: Boolean, default: false },
    fechaSolicitud: { type: Date, default: Date.now() },
    royal: { type: Boolean, default: false }
});

//modelo Curso
const cursoModel = mongoose.model('Curso', cursoSchema, 'cursos');

//exportar
module.exports = cursoModel;