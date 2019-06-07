const express = require('express');
const wagner = require('wagner-core');
const bodyParser = require('body-parser');


//Poner disponible los models
require('./models/models')(wagner);

//Importar Routers
const personaRouter = require('./routers/persona.router')(wagner);
const cursoRouter = require('./routers/curso.router')(wagner);
const cobroRouter = require('./routers/cobro.router')(wagner);
const codigoRouter = require('./routers/codigo.router')(wagner);
const compraRouter = require('./routers/compra.router')(wagner);
const comunidadRouter = require('./routers/comunidad.router')(wagner);
const valoracionRouter = require('./routers/valoracion.router')(wagner);

//configurar servidor express
let app =express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//Agregar rutas
app.use("/personas",personaRouter);
app.use("/cursos",cursoRouter);
app.use("/cobros",cobroRouter);
app.use("/codigos",codigoRouter);
app.use("/compras",compraRouter);
app.use("/comunidad",comunidadRouter);
app.use("/valoraciones",valoracionRouter);


module.exports = app;