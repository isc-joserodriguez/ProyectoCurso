const mongoose = require('mongoose');

//esquema
//definir el esquema que vamos a manejar
const personaSchema = new mongoose.Schema({
    _id: { type: Number, required: true },
    credencial: {
        correo: { type: String, required: true },
        contraseña: { type: String, required: true }
    },
    tipo: { type: Array, default: [{}, {}, {}, { alumno: true }] }, //1= Admin 2=Coord 3=Maestro 4= Alumno
    sexo: { type: Number, default: 3 }, //1= H 2= M 3= Indef
    nombre: { type: String },
    apPaterno: { type: String },
    apMaterno: { type: String },
    fechaNac: { type: Date, default: Date.now() },
    foto: { type: String, default: 'http://www.lorempixel.com/200/200' },
    web: { type: String, default: ' ' },
    fb: { type: String, default: ' ' },
    yt: { type: String, default: ' ' },
    in: { type: String, default: ' ' },
    cursoMaestro: [{}],
    insignias: [{ idInsignia: { type: Number }, ruta: { type: String } }],
    cursoAlumno: [{
        ruta: { type: String, required: true }, fecha: { type: Date, default: Date.now() }, avance: { type: String, default: '0-0-0' }, estadoCurso: { type: Number, default: 0 } //0 - Sin terminar | 1- terminado
    }],
    carrito: [{ _id: { type: String, required: true }, codigos: [{ _id: { type: String } }] }],
    historialCompra: [{ _id: { type: String, required: true } }],
    historialCobro: [{ _id: { type: String, required: true } }],
    metodosPago: [{ _id: { type: String, required: true }, numero: { type: String, required: true }, mes: { type: Number, required: true }, año: { type: Number, required: true }, cvc: { type: Number, required: true } }],
    certificados: [{ _id: { type: String, required: true }, nombre: { type: String, required: true }, autoridad: { type: String, required: true }, url: { type: String, required: true }, fecha: { type: String, required: true } }],
    identificacion: { type: String },
    curriculum: { type: String },
    notificaciones: [{ _id: { type: String, required: true }, personaId: { type: String, required: true }, fecha: { type: Date, required: true }, descripción: { type: String, required: true }, estado: { type: Boolean, required: true } }],
    resumen: { type: String, default: ' ' },
    puntaje: { type: Number, default: 0 },
    ruta: { type: String }
});

//modelo Persona
const personaModel = mongoose.model('Persona', personaSchema, 'personas');

//exportar
module.exports = personaModel;