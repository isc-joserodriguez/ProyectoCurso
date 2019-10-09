const mongoose = require('mongoose');

//esquema
//definir el esquema que vamos a manejar
const cursoSchema = new mongoose.Schema({
    _id: { type: Number, required: true },
    ruta: { type: String, required: true },
    idMaestro: { type: Number, required: true },
    nombreCompleto: { type: String, required: true },
    nombreCorto: { type: String, required: true },
    descripcionCurso: { type: String, required: true },
    objetivos: { type: Array, required: true },
    imagen: { type: String, default: 'http://www.lorempixel.com/200/200' },
    categoria: { type: String, required: true },
    subcategoria: { type: String, required: true },
    introduccionVideo: { type: String, default: 'http://vjs.zencdn.net/v/oceans.mp4' },
    contenidoCurso: [
        {
            unidad: { type: String },
            ponderacionUnidad: { type: Number },
            subtemas: [{
                subtema: { type: String },
                ponderacionSubtemas: { type: Number },
                clases: [{
                    clase: { type: String },
                    ponderacionSubtemas: { type: Number },
                    contenidoClase: [{
                        ponderacion: { type: Number },
                        tipoPlantilla: { type: Number },//0 - Video y Texto | 1 -  Recurso | 2 - Texto
                        video: { type: String },
                        texto: { type: String },
                        recursos: [{ type: String }],//Recursos del contenido de la leccion
                        tarea: [{ recurso: { type: String }, envios: [{ _id: { type: String }, idAlumno: { type: String }, estatus: { type: String }, calificacion: { type: String }, fecha: { type: Date }, retroalimentacion: { type: String } }] }],//Recursos de la tarea
                        comentarios: [{ _id: { type: String }, idPersona: { type: String }, comentario: { type: String }, respuestas: [{ _id: { type: String }, idPersona: { type: String }, comentario: { type: String } }] }]
                    }]
                }]
            }],
            evaluacion: { type: String } //Evaluación de la unidad (opcional).
        }
    ],
    insignias: [{ nombreInsignia: { type: String }, descripcionInsignia: { type: String }, imagen: { type: String } }],
    precio: { type: Number },
    cursosRelacionados: [{ _id: { type: String, required: true } }],
    estado: { type: Number, default: 1 }, //1:En revisión, 2:Aceptado, 3:Rechazado
    publicacion: { type: Boolean, default: false },
    fechaSolicitud: { type: Date, default: Date.now() },
    royal: { type: Boolean, default: false },
    notas: { type: String },
    alumnosInscritos: [{ idAlumno: { type: Number } }]
});

//modelo Curso
const cursoModel = mongoose.model('Curso', cursoSchema, 'cursos');

//exportar
module.exports = cursoModel;