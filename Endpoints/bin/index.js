const app =require('../server');

//Congigurando el servidor http
const server = require('http').Server(app);
const port = 3002;

//Ejecutando el servidor 
server.listen(port);
console.log('Running on port '+ port);