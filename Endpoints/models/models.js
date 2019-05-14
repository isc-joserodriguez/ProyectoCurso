const mongoose = require('mongoose');

//recorrer objetos y arreglos facil
const _ = require('underscore');

module.exports = (wagner) => {
    //Conexion
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost:27017/PlataformaCursos',{useNewUrlParser:true});
    //funcion callback que se ejecuta cuando el wagner pone disponible esa variable, pongo como valor mongoose
    //si quiero acceder a mi bd desde otro punto es acceder con wagner
    wagner.factory('db',()=> mongoose);
    
    //Declarar modelos
    const Persona = require('./persona.model');
    const Curso = require('./curso.model');
    const Valoracion = require('./valoracion.model');
    const Comunidad = require('./comunidad.model');
    const models = {
        Persona,
        Curso,
        Valoracion,
        Comunidad
    }
    //recorrer los modelos y ponerlos disponibles
    _.each(models,(v,k)=>{
        wagner.factory(k,()=>v);
    });
}
