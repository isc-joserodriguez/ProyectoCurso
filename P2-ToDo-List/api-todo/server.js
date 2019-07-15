const express = require('express');
const wagner = require('wagner-core');
const bodyParser = require('body-parser');

//Poner disponible los models
require('./models/models')(wagner);

//Importar Routers
const todoRouter = require('./routers/todo.router')(wagner);

//configurar servidor express
let app =express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//Agregar rutas
app.use("/todo",todoRouter);

module.exports = app;