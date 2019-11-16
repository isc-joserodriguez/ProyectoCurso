const mongoose = require('mongoose');

//esquema
//definir el esquema que vamos a manejar
const diarioSchema = new mongoose.Schema({
    _id: { type: Number, required: true },
    idPersona: { type: Number, required: true },
    titulo: { type: String, required: true },
    escrito: { type: String, required: true },
    fecha: { type: Date, default: Date.now() },
    categoria: { type: String, required: true }, //idioma
    respuestas: [{
        reportado: { type: Boolean, default: false },
        idPersona: { type: Number },
        comentario: { type: String },
        fecha: { type: Date, default: Date.now() },
        respuestas: [{
            reportado: { type: Boolean, default: false },
            idPersona: { type: Number },
            comentario: { type: String },
            fecha: { type: Date, default: Date.now() }
        }]
    }],
    ruta: { type: String },
    reportado: { type: Boolean, default: false },
    reportes: [{
        activo: { type: Boolean, default: true },
        tipo: { type: Number }, //0-Entrada principal | 1-Respuesta n1 | 2- Respuesta n2
        respn1: { type: Number },
        respn2: { type: Number },
        idAlumno: { type: Number }
    }]
});

//modelo Curso
const diarioModel = mongoose.model('Diario', diarioSchema, 'diarios');

//exportar
module.exports = diarioModel;