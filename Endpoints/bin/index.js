const app = require('../server');
const config = require('../config');
//Congigurando el servidor http
const server = require('http').Server(app);

//Ejecutando el servidor 
server.listen(config.port);
console.log('Running on port ' + config.port);