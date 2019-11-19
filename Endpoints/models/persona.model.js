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
    cursoMaestro: [{
        ruta: { type: String, required: true }
    }],
    insignias: [{
        idInsignia: { type: Number },
        ruta: { type: String }
    }],
    cursoAlumno: [{
        ruta: { type: String, required: true },
        fecha: { type: Date, default: Date.now() },
        avance: { type: String, default: '0-0-0' },
        estadoCurso: { type: Number, default: 0 } //0 - Sin terminar | 1- terminado
    }],
    certificados: [{
        ruta: { type: String, default: 'N/A' },
        nombre: { type: String, required: true },
        url: { type: String, required: true },
        fecha: { type: String, default: Date.now() }
    }],
    curriculum: { type: String },
    notificaciones: [{
        ruta: { type: String },
        fecha: { type: Date, default: Date.now() },
        descripcion: { type: String },
        estado: { type: Boolean, default: true }
    }],
    documentos: {
        curriculum: { type: String },
        identificacion: { type: String },
        certificados: [{
            nombre: { type: String },
            url: { type: String }
        }]
    },
    resumen: { type: String, default: ' ' },
    puntaje: { type: Number, default: 0 },
    ruta: { type: String },
    royal: { type: Number, default: 0 },//0-Normal | 1-Royal
    codigos: []
});

//modelo Persona
const personaModel = mongoose.model('Persona', personaSchema, 'personas');

//exportar
module.exports = personaModel;