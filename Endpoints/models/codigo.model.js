const mongoose = require('mongoose');

//esquema
//definir el esquema que vamos a manejar
const codigoSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    tipo: { type: Number },//0-Codigo | 1-fecha
    codigo: { type: String, required: true },
    cursos: [{ _id: { type: String, required: true } }],
    fechaInicio: { type: Date, required: true },
    fechaExpiracion: { type: Date, required: true },
    usos: { type: Number, default: 0 }
});

//modelo Curso
const codigoModel = mongoose.model('Codigo', codigoSchema, 'codigo');

//exportar
module.exports = codigoModel;