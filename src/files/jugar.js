document.addEventListener("keydown", downKey)
document.addEventListener("keyup", upKey)

var socket = io()

var frame = window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame;

var canvas = document.getElementById('game')
var ctx = canvas.getContext('2d')
var overlay = document.getElementById('apodoOver')
var apodo = document.querySelector('.apodo')
var color = document.querySelector('.color')

var selectWorld = 3

var background = [
  new Image(),
  new Image(),
  new Image()
]
background[0].src = "https://media.discordapp.net/attachments/961066933669728257/963134830390935632/unknown.png?width=724&height=406"
background[1].src = "https://media.discordapp.net/attachments/944651501823987722/963425540864360508/unknown.png?width=543&height=406"
background[2].src = "https://media.discordapp.net/attachments/963551772486561843/963572673919713330/unknown.png"

var colors = [
  "blue",
  "purple",
  "elbeige"
]

var pond = [
  {
    "name": "Durick",
    "x": "50",
    "y": "50",
    "color": "blue",
    "image": new Image(),
    "ubicacionX": 0,
    "countSprite": 0,
    "invisible": false,
    "numero": 0,
    "numY": 0
  },
  {
    "name": "Never Gonna Give You Up",
    "x": "100",
    "y": "160",
    "color": "red",
    "image": new Image(),
    "ubicacionX": 0,
    "countSprite": 0,
    "invisible": false,
    "numero": 0,
    "numY": 0
  }
]

var addRoom = [
  {
    "x": 305,
    "y": 190,
    "width": 20,
    "height": 20
  }
]

var ejemIma = new Image()
ejemIma.src = "https://media.discordapp.net/attachments/961066933669728257/963532575702388836/unknown.png"



function addName(nombre, color) {
  pond.push({
    "name": nombre,
    "x": 480,
    "y": 260,
    "color": color,
    "image": new Image(),
    "ubicacionX": 0,
    "countSprite": 0,
    "invisible": false,
    "numero": 0,
    "numY": 0
  })
  generatePlayers()
}

function world() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  if (selectWorld == 1) {
    ctx.drawImage(background[1], 0, 0, canvas.width, canvas.height)
  } else if (selectWorld == 2) {
    ctx.drawImage(background[0], 0, 0, canvas.width, canvas.height)
  } else if (selectWorld == 3) {
    ctx.drawImage(background[2], -10, -10, canvas.width + 10, canvas.height + 10)
  }
}



function addRoom(x, y, width, height) {
  this.x = x
  this.y = y
  this.width = width
  this.height = height
  var resultSolid = {
    "x": this.x,
    "y": this.y,
    "width": this.width,
    "height": this.height
  }
  return resultSolid
}

function generatePlayers() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  world()
  for (var i = 0; i < pond.length; i++) {
    ctx.fillStyle = pond[i].color
    ctx.drawImage(ejemIma, pond[i].numero, pond[i].numY, 28, 39, pond[i].x, pond[i].y, 50, 70)
    ctx.fillStyle = "black"
    ctx.fillText(pond[i].name, pond[i].x, pond[i].y + 75)
  }
}

function positions() {
  for (var i = 0; i < pond.length; i++) {
    if (pond[i].x > canvas.width) {
      if(!pond[i].invisible){
        pond[i].x = canvas.width - 20
      }
    }
    if (pond[i].y > canvas.height) {
      pond[i].y = canvas.height - 20
    }
    if (pond[i].x < 0) {
      pond[i].x = 0
    }
    if (pond[i].y < 110) {
      pond[i].y = 110
    }
    if (selectWorld == 2) {
      if (pond[i].x < 200) {
        pond[i].x = 220
      }
      if (pond[i].y < 230) {
        pond[i].y = 250
      }
      if (pond[i].y > canvas.height - 180) {
        pond[i].y = canvas.height - 210
      }
    }
  }
}

function downKey(e) {
  var key = e.keyCode
  if (e.keyCode == 37) {
    for (var i = 0; i < pond.length; i++) {
      if (pond[i].name == localStorage.getItem('name')) {
        pond[i].x -= 5
        pond[i].numY = 0
        generatePlayers()
        socket.emit('genep', pond[i], i, pond[i].name, selectWorld, pond[i].color)
      }
    }
  }
  if (e.keyCode == 38) {
    for (var i = 0; i < pond.length; i++) {
      if (pond[i].name == localStorage.getItem('name')) {
        pond[i].y -= 5
        pond[i].numY = 117
        generatePlayers()
        socket.emit('genep', pond[i], i, pond[i].name, selectWorld, pond[i].color)
      }
    }
  }
  if (e.keyCode == 39) {
    for (var i = 0; i < pond.length; i++) {
      if (pond[i].name == localStorage.getItem('name')) {
        pond[i].x += 5
        pond[i].numY = 39
        generatePlayers()
        socket.emit('genep', pond[i], i, pond[i].name, selectWorld, pond[i].color)
      }
    }
  }
  if (e.keyCode == 40) {
    for (var i = 0; i < pond.length; i++) {
      if (pond[i].name == localStorage.getItem('name')) {
        pond[i].y += 5
        pond[i].numY = 78
        generatePlayers()
        socket.emit('genep', pond[i], i, pond[i].name, selectWorld, pond[i].color)
      }
    }
  }
}

function upKey(e){
  if(e.keyCode == 37){
    for (var i = 0; i < pond.length; i++) {
      if (pond[i].name == localStorage.getItem('name')) {
        pond[i].numero = 0
        pond[i].numY = 0
        generatePlayers()
        socket.emit('genep', pond[i], i, pond[i].name, selectWorld, pond[i].color)
      }
    }
  }
  if(e.keyCode == 38){
    for (var i = 0; i < pond.length; i++) {
      if (pond[i].name == localStorage.getItem('name')) {
        pond[i].numero = 0
        pond[i].numY = 117
        generatePlayers()
        socket.emit('genep', pond[i], i, pond[i].name, selectWorld, pond[i].color)
      }
    }
  }
  if(e.keyCode == 39){
    for (var i = 0; i < pond.length; i++) {
      if (pond[i].name == localStorage.getItem('name')) {
        pond[i].numero = 0
        pond[i].numY = 39
        generatePlayers()
        socket.emit('genep', pond[i], i, pond[i].name, selectWorld, pond[i].color)
      }
    }
  }
  if(e.keyCode == 40){
    for (var i = 0; i < pond.length; i++) {
      if (pond[i].name == localStorage.getItem('name')) {
        pond[i].numero = 0
        pond[i].numY = 78
        generatePlayers()
        socket.emit('genep', pond[i], i, pond[i].name, selectWorld, pond[i].color)
      }
    }
  }
}

function moveMovil(keyCode){
  if(keyCode == 37){
    for (var i = 0; i < pond.length; i++) {
      if (pond[i].name == localStorage.getItem('name')) {
        pond[i].x -= 5
        pond[i].numero = 0
        pond[i].numY = 0
        generatePlayers()
        socket.emit('genep', pond[i], i, pond[i].name, selectWorld, pond[i].color)
      }
    }
  }
  if(keyCode == 38){
    for (var i = 0; i < pond.length; i++) {
      if (pond[i].name == localStorage.getItem('name')) {
         pond[i].y -= 5
        pond[i].numero = 0
        pond[i].numY = 117
        generatePlayers()
        socket.emit('genep', pond[i], i, pond[i].name, selectWorld, pond[i].color)
      }
    }
  }
  if(keyCode == 39){
    for (var i = 0; i < pond.length; i++) {
      if (pond[i].name == localStorage.getItem('name')) {
         pond[i].x += 5
        pond[i].numero = 0
        pond[i].numY = 39
        generatePlayers()
        socket.emit('genep', pond[i], i, pond[i].name, selectWorld, pond[i].color)
      }
    }
  }
  if(keyCode == 40){
    for (var i = 0; i < pond.length; i++) {
      if (pond[i].name == localStorage.getItem('name')) {
        pond[i].y += 5
        pond[i].numero = 0
        pond[i].numY = 78
        generatePlayers()
        socket.emit('genep', pond[i], i, pond[i].name, selectWorld, pond[i].color)
      }
    }
  }
}

function verificWorld() {
  for (var i = 0; i < pond.length; i++) {
    if (pond[i].x > canvas.width - 10) {
      selectWorld--
      pond[i].x = 480
      pond[i].y = 260
      generatePlayers()
    }
  }
}

function repeat() {
  setInterval(function() {
    positions()
    verificWorld()
  }, 10)
}

function animaciones(){
  for(var i = 0; i < pond.length; i++){
    if(pond[i].name == localStorage.getItem('name')){
   if(pond[i].numero >= 112){
     pond[i].numero = 0
   }else{
     pond[i].numero += 28
   }
    }
  }
  frame(animaciones)
}


window.onload = function() {
  /* if(localStorage.getItem('name')){
    generatePlayers()
   */
  if (!localStorage.getItem('name')) {
    overlay.classList.add('active')
  } else {
    overlay.classList.remove('active')
    socket.emit('actualizar jugadores',
      localStorage.getItem('name'),
      localStorage.getItem('color'))
    addName(localStorage.getItem('name'), localStorage.getItem('color'))
  }
  world()
  generatePlayers()
  repeat()
  addMusic()
  animaciones()
}

world()

function aplicarApodo() {
  if (apodo.value) {
    if (color.value) {
      localStorage.setItem('name', apodo.value)
      localStorage.setItem('color', color.value)
      overlay.classList.remove('active')
      socket.emit('actualizar jugadores', localStorage.getItem('name'), localStorage.getItem('color'))
      addName(localStorage.getItem('name'), localStorage.getItem('color'))
      world()
      generatePlayers()
      socket.emit()
    }
  }
}

socket.on('actualizar jugadores', (nombre, color) => {
  console.log('se ejecuta actualizar')
  addName(nombre, color)
  generatePlayers()
})

socket.on('genep', (jugador, id, jugadorna, room, color) => {
  for (var i = 0; i < pond.length; i++) {
    if(pond[i].name === jugadorna){ 
      if(selectWorld === room){
       pond[i] = jugador
       generatePlayers()
      }else{
       pond[i].x = 10000000000
       pond[i].color = "#00000000"
       generatePlayers()
      }
    }else if(pond.length-1 == i){
      if(selectWorld === room){
       pond.push(jugador)
       generatePlayers()
      }else{
       generatePlayers()
      }
    }
  }
})

socket.on('userDis', (user) => {
  for (var i = 0; i < pond.length; i++) {
    if (pond[i].name == user) {
      pond[i].x = -600
      pond[i].y = -8000
      generatePlayers()
    }
    generatePlayers()
  }
})