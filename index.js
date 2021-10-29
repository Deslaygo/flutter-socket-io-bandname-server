const express = require('express');

const path = require('path');
require('dotenv').config(); 

//app de express
const app = express();

//node server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');




//Se define path público
const publiCPath = path.resolve(__dirname,'public');

//Se usa index html
app.use(express.static(publiCPath));

server.listen(process.env.PORT,(err) => {
  if(err) throw new Error(err);

  console.log(`Servidor esta corriendo en el puerto ${process.env.PORT}`);
});

