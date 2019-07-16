const mongoose = require('mongoose');

//recorrer objetos y arreglos facil
const _ = require('underscore');

module.exports = (wagner) => {
    //Conexion
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost:27017/TodoList',{useNewUrlParser:true});
    //funcion callback que se ejecuta cuando el wagner pone disponible esa variable, pongo como valor mongoose
    //si quiero acceder a mi bd desde otro punto es acceder con wagner
    wagner.factory('db',()=> mongoose);
    
    //Declarar modelos
    const Todo = require('./todo.model');
    const models = {
        Todo
    }
    //recorrer los modelos y ponerlos disponibles
    _.each(models,(v,k)=>{
        wagner.factory(k,()=>v);
    });
}