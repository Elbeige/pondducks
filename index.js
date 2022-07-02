const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

var Publishable_Key = 'pk_test_51KK9HRCVF9STrE9fpdnzMFg0uEEdsEWy2CmUX9ssSfjALMZBm9bkj6Z7TL6mHV8QR3Nb8QS5Tm8D7UcGyNhvnWnb007OdBsABL'
var Secret_Key = process.env['Secret']
  
const stripe = require('stripe')(Secret_Key)

const mongoose = require('mongoose')

require(__dirname + '/src/database.js')
require(__dirname + '/src/sitio.js')(app, express, stripe)
require(__dirname + '/src/bot.js')(express, app)


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