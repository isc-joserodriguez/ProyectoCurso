const mongoose = require('mongoose');

//esquema
//definir el esquema que vamos a manejar
const compraSchema = new mongoose.Schema({
    _id: { type: Number },
    idAdmin: { type: Number, required: true },
    idPersona: { type: Number, required: true },
    importe: { type: Number, required: true },
    fecha: { type: Date, default: Date.now() },
    fechaLimite: { type: Date, default: Date.now() },
    abonos: [{
        idAdmin: { type: Number, required: true },
        importe: { type: Number, required: true },
        fecha: { type: Date, default: Date.now() }
    }],
    resto: { type: Number, default: 0 },
    estado: { type: Number, required: true }, //0-Pagado | 1-Pendiente
    cursos: [{
        ruta: { type: Number, required: true }
    }]
});

//modelo Curso
const compraModel = mongoose.model('Compra', compraSchema, 'compras');

//exportar
module.exports = compraModel;