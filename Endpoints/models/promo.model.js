const mongoose = require('mongoose');

//esquema
//definir el esquema que vamos a manejar
const promoSchema = new mongoose.Schema({
    _id: { type: Number },
    tipo: { type: Number },//0-Codigo | 1-fecha
    codigo: { type: String, default: 'N/A' },
    porcentaje: { type: Number },
    fechaInicio: { type: Date },
    fechaFin: { type: Date },
    usos: { type: Number, default: 0 },
    cumple: { type: Boolean, default: false },
    estatus: { type: Boolean, default: true }
});

//modelo Curso
const promoModel = mongoose.model('Promo', promoSchema, 'promo');

//exportar
module.exports = promoModel;