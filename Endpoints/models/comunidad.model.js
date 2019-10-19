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
    respuestas: [{ idPersona: { type: Number }, comentario: { type: String }, fecha: { type: Date, default: Date.now() } }],
    ruta: { type: String, required: true }
});

//modelo Curso
const comunidadModel = mongoose.model('Comunidad', comunidadSchema, 'comunidades');

//exportar
module.exports = comunidadModel;