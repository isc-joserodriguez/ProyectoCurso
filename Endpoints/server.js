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

// Configurar cabeceras y <span class="searchword">cors</span>
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-<span class="searchword">API</span>-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


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