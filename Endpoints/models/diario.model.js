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
        idPersona: { type: Number },
        comentario: { type: String },
        fecha: { type: Date, default: Date.now() },
        respuestas: [{
            idPersona: { type: Number },
            comentario: { type: String },
            fecha: { type: Date, default: Date.now() }
        }]
    }],
    ruta: { type: String },
    reportes: [{
        idAlumno: { type: Number },
        ruta: { type: String },
        comentario: { type: String },
        numReportes: { type: Number }
    }]
});

//modelo Curso
const diarioModel = mongoose.model('Diario', diarioSchema, 'diarios');

//exportar
module.exports = diarioModel;