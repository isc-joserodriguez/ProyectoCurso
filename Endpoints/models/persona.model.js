const mongoose = require('mongoose');

//esquema
//definir el esquema que vamos a manejar
const personaSchema = new mongoose.Schema({
    credencial:{
        correo:{
            type:String,
            required: true
        },
        contraseña:{
            type:String,
            required: true
        }
    },
    tipo:{type:Array,default:[4]},
    nombre:{
        type:String
    },
    apPaterno:{
        type:String,
    },
    apMaterno:{
        type:String,
    },
    fechaNac:{
        type:Date
    },
    foto:{
        type:String
    },
    paginaWeb:{
        type:String
    },
    redSocial:[
        {
            red:{
                type:String
            },
            url:{
                type:String
            }
        }],
    cursoMaestro:[{}],
    cursoAlumno:[{}],
    });
    
//modelo Persona
const personaModel = mongoose.model('Persona', personaSchema,'personas');

//exportar
module.exports= personaModel;
