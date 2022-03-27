/******** SETTINGS REQUIRE *********/
const http = require('http');
const { app } = require('./app.js');


/******* SETTINGS *******/
const PORT = process.env.PORT || 3000;


const server = http.createServer(app);

server.listen(PORT,() => {
  console.log(`Serveur en écoute sur le port ${PORT}...`);
});