const express = require('express');
const wagner = require('wagner-core');
const bodyParser = require('body-parser');

//Poner disponible los models
require('./models/models')(wagner);

//Importar Routers
const personaRouter = require('./routers/persona.router')(wagner);
const cursoRouter = require('./routers/curso.router')(wagner);

//configurar servidor express
let app =express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//Agregar rutas
app.use("/personas",personaRouter);
app.use("/cursos",cursoRouter);


module.exports = app;