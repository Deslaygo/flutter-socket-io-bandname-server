
const {io} = require('../index');

//Mensajes de sockets
io.on('connection', client => {
  console.log('Cliente se ha conectado');
  client.on('event', data => { /* … */ });
  client.on('disconnect', () => {
    console.log('Cliente se ha desconectado');
  });

  client.on('mensaje',(payload) =>{
    console.log(payload);
    io.emit('mensaje',{admin:'Nuevo mensaje'});
  });
});