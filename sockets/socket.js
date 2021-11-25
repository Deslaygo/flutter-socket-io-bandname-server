
const {io} = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');
const bands = new Bands();

console.log('Init Server');

bands.addBand(new Band('Queen'));
bands.addBand(new Band('Charlie papa'));
bands.addBand(new Band('Nirvana'));
bands.addBand(new Band('The clash'));

console.log(bands);

//Mensajes de sockets
io.on('connection', client => {
  console.log('Cliente se ha conectado');

  client.emit('active-bands', bands.getBands());


  client.on('event', data => { /* … */ });
  client.on('disconnect', () => {
    console.log('Cliente se ha desconectado');
  });

  client.on('vote-band',(payload)=>{
    console.log(payload.id);
    bands.voteBand(payload.id);
    io.emit('active-bands', bands.getBands());
  });

  client.on('add-band',(payload)=>{
    console.log(payload);
    bands.addBand(new Band(payload.name));
    io.emit('active-bands', bands.getBands());
  });

  client.on('delete-band',(payload)=>{
    console.log(payload.id);
    bands.deleteBand(payload.id);
    io.emit('active-bands', bands.getBands());
  });

  client.on('emitir-mensaje',(payload)=>{
    console.log(payload);
    client.broadcast.emit('nuevo-mensaje',payload);
  });
});