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
                ponderacionSubtema: { type: Number },
                clases: [{
                    ponderacionClase: { type: Number },
                    clase: { type: String },
                    tipoPlantilla: { type: Number, default: 0 },//0 - Video y Texto | 1 - Texto
                    video: { type: String, default: 'http://vjs.zencdn.net/v/oceans.mp4' },
                    texto: { type: String, default: '' },
                    recursos: {
                        activo: { type: Boolean, default: false },
                        urls: [{ urlRecurso: { type: String }, textoRecurso: { type: String } }]
                    },//Recursos del contenido de la leccion
                    tarea: {
                        activo: { type: Boolean, default: false },
                        instruccion: { type: String },
                        fechaLimite: { type: Date },
                        envios: [{
                            idAlumno: { type: Number },
                            tarea: { type: String },
                            fechaRevisión: { type: Date },
                            retroalimentacion: { type: String },
                            estatus: { type: Number, default: 0 /* 0 - Entregado | 1 - Aprobado | 2 - No Aprobado */ },
                            fechaEntrega: { type: Date, default: Date.now() }
                        }]
                    },//Recursos de la tarea
                    comentarios: [{ idPersona: { type: Number }, comentario: { type: String }, respuestas: [{ idPersona: { type: String }, comentario: { type: String } }] }]
                }]
            }],
            evaluacion: {
                activo: { type: Boolean, default: true },
                recurso: { type: Number }
            } //Evaluación de la unidad (opcional).
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