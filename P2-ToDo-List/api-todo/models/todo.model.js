const mongoose = require('mongoose');

//esquema
//definir el esquema que vamos a manejar
const todoSchema = new mongoose.Schema({
    nombreTarea:{type:String, required:true},
    descripcionTarea:{type: String, required:true},
    fechaCreacionTarea:{ type: Date, default: Date.now },
    fechaCompletadaTarea:{ type: Date, default: Date.now },
    estadoTarea:{type: Boolean, default: false }
});

//modelo Curso
const todoModel = mongoose.model('Todo', todoSchema,'todo');

//exportar
module.exports= todoModel;