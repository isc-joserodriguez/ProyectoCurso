const mongoose = require('mongoose');

//esquema
//definir el esquema que vamos a manejar
const promoSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    tipo: { type: Number },//0-Promo | 1-fecha
    promo: { type: String, required: true },
    cursos: [{ _id: { type: String, required: true } }],
    fechaInicio: { type: Date, required: true },
    fechaExpiracion: { type: Date, required: true },
    usos: { type: Number, default: 0 }
});

//modelo Curso
const promoModel = mongoose.model('Promo', promoSchema, 'promo');

//exportar
module.exports = promoModel;