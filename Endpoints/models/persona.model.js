const mongoose = require('mongoose');

//esquema
//definir el esquema que vamos a manejar
const personaSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    credencial: {
        correo: { type: String, required: true },
        contraseña: { type: String, required: true }
    },
    tipo: { type: Array, default: [4] }, //1= Admin 2=Coord 3=Maestro 4= Alumno
    sexo: { type: Number, default: 3 }, //1= H 2= M 3= Indef
    nombre: { type: String },
    apPaterno: { type: String },
    apMaterno: { type: String },
    fechaNac: { type: Date },
    foto: { type: String },
    paginaWeb: { type: String },
    estatus: {type: Boolean, default: true},
    redSocial: [
        {
            red: { type: String },
            url: { type: String }
        }],
    cursoMaestro: [{}],
    cursoAlumno: [{ _id: { type: String, required: true }, estadoCurso: { type: String } }],
    carrito: [{ _id: { type: String, required: true }, codigos: [{ _id: { type: String } }] }],
    historialCompra: [{ _id: { type: String, required: true } }],
    historialCobro: [{ _id: { type: String, required: true } }],
    metodosPago: [{ _id: { type: String, required: true }, numero: { type: String, required: true }, mes: { type: Number, required: true }, año: { type: Number, required: true }, cvc: { type: Number, required: true } }],
    certificados: [{ _id: { type: String, required: true }, nombre: { type: String, required: true }, autoridad: { type: String, required: true }, url: { type: String, required: true }, fecha: { type: String, required: true } }],
    identificacion: { type: String },
    curriculum: { type: String },
    notificaciones: [{ _id: { type: String, required: true }, personaId: { type: String, required: true }, fecha: { type: Date, required: true }, descripción: { type: String, required: true }, estado: { type: Boolean, required: true } }]
});

//modelo Persona
const personaModel = mongoose.model('Persona', personaSchema, 'personas');

//exportar
module.exports = personaModel;