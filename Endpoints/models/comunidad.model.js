const mongoose = require('mongoose');

//esquema
//definir el esquema que vamos a manejar
const comunidadSchema = new mongoose.Schema({
    _id: { type: Number, required: true },
    idPersona: { type: Number, required: true },
    pregunta: { type: String, required: true },
    detalles: { type: String, required: true },
    actualizaciones: [{ actualizacion: { type: String } }],
    fecha: { type: Date, default: Date.now() },
    categoria: { type: String, required: true }, //tecnologia - idiomas
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
const comunidadModel = mongoose.model('Comunidad', comunidadSchema, 'comunidades');

//exportar
module.exports = comunidadModel;