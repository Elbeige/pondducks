const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

require(__dirname + '/src/sitio.js')(app, express)

io.on('connection', (socket) =>{
  console.log('un usuario se unio al servidor')
  socket.on('actualizar jugadores', (nombre, color) =>{
    socket.broadcast.emit('actualizar jugadores', nombre, color)
  })
  socket.on('genep', (jugador, id, name, room, color) =>{
    socket.broadcast.emit('genep', jugador, id, name, room)
  })
  socket.on('userDis', (user) =>{
    socket.emit('userDis', user)
  })
  socket.on('disconnect', function(){
    console.log('un usuario se desconecto')
  })
  socket.on('sendGlobal', (titulo, texto) =>{
  io.emit('sendGlobal', titulo, texto)
})
  socket.on('sendMessage', (message, author) =>{
    io.emit('sendMessage', message, author)
    console.log('Message ' + author + ': ' + message)
  })
})

server.listen(3000, () => {
  console.log('server started');
});
