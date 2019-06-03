const mongoose = require('mongoose');

//esquema
//definir el esquema que vamos a manejar
const valoracionSchema = new mongoose.Schema({
    _id: { type:String, required:true },
    idCurso: { type:String, required: true },
    idPersona: { type:String, required:true },
    comentario: { type:String, required:true },
    puntuacion: { type:Number, required:true }
});

//modelo Curso
const valoracionModel = mongoose.model('Valoracion', valoracionSchema,'valoraciones');

//exportar
module.exports= valoracionModel;