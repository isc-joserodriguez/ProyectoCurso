const mongoose = require('mongoose');

//esquema
//definir el esquema que vamos a manejar
const comunidadSchema = new mongoose.Schema({
    _id:{type:String, required:true},
    idPersona:{type: String, required:true},
    nombreTema:{type:String,required:true},
    cuerpoTema:{type:String, required:true},
    fechaTema:{type:Date, required:true},
    categoriaTema:{type:Number,required:true},
    repuestas:[{_id:{type:String, required:true},idPersona:{type: String, required:true},comentario:{type: String, required:true},fecha:{type:Date,required:true}}]
});

//modelo Curso
const comunidadModel = mongoose.model('Comunidad', comunidadSchema,'comunidades');

//exportar
module.exports= comunidadModel;