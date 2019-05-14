const mongoose = require('mongoose');

//esquema
//definir el esquema que vamos a manejar
const compraSchema = new mongoose.Schema({
    _id:{type:String, required:true},
    idPersona:{type: String, required:true},
    importe:{type:Number,required:true},
    fecha:{type:Date, required:true},
    estado:{type:Date, required:true},
    cursos:[{_id:{type:String,required:true}}]
});

//modelo Curso
const compraModel = mongoose.model('Compra', compraSchema,'compras');

//exportar
module.exports= compraModel;