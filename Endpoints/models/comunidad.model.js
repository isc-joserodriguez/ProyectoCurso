const mongoose = require('mongoose');

//esquema
//definir el esquema que vamos a manejar
const comunidadSchema = new mongoose.Schema({
    _id: { type: Number, required: true },
    idPersona: { type: Number, required: true },
    nombreTema: { type: String, required: true },
    cuerpoTema: { type: String, required: true },
    fechaTema: { type: Date, required: true },
    categoriaTema: { type: Number, required: true }, //0 - Tecnología 1 - Idiomas
    repuestas: [{ _id: { type: Number }, idPersona: { type: Number }, comentario: { type: String }, fecha: { type: Date } }]
});

//modelo Curso
const comunidadModel = mongoose.model('Comunidad', comunidadSchema, 'comunidades');

//exportar
module.exports = comunidadModel;