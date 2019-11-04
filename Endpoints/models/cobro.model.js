const mongoose = require('mongoose');

//esquema
//definir el esquema que vamos a manejar
const cobroSchema = new mongoose.Schema({
    _id: { type: Number, required: true },
    idPersona: { type: String, required: true },
    importe: { type: Number, required: true },
    fecha: { type: Date, required: true },
    estado: { type: Date, required: true }
});

//modelo Curso
const cobroModel = mongoose.model('Cobro', cobroSchema, 'cobros');

//exportar
module.exports = cobroModel;