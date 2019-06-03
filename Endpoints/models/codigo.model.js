const mongoose = require('mongoose');

//esquema
//definir el esquema que vamos a manejar
const codigoSchema = new mongoose.Schema({
    _id:{type:String, required:true},
    codigo:{type: String, required:true},
    cursos:[{_id:{type:String,required:true}}],
    fechaExpiracion:{type:Date, required:true}
});

//modelo Curso
const codigoModel = mongoose.model('Codigo', codigoSchema,'codigo');

//exportar
module.exports= codigoModel;