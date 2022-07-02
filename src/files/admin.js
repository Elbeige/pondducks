document.addEventListener("keydown", downKey)
document.addEventListener("keyup", upKey)


var socket = io()

var canMove = false

var frame = window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame;

var canvas = document.getElementById('game')
var ctx = canvas.getContext('2d')
var overlay = document.getElementById('apodoOver')
var apodo = document.querySelector('.apodo')
var color = document.querySelector('.color')

var coinsPlayer = document.querySelector('.coins')
var divItems = document.querySelector('.items')

var inputMessage = document.querySelector('.inputMessage')

var catalog = document.querySelector('.catalogo')
var catalogRupple = document.querySelector('.catalogoRupple')

var jugarPera = document.querySelector('.jugarPera')

var shop = document.getElementById('shop')

var selectWorld = 4

var background = [
  new Image(),
  new Image(),
  new Image(),
  new Image(),
  new Image(),
  new Image(),
  new Image(),
  new Image(),
  new Image(),
  new Image()
]
background[0].src = "https://media.discordapp.net/attachments/987761206448255016/987874215195709450/unknown.png?width=794&height=492"
background[1].src = "https://media.discordapp.net/attachments/961066933669728257/964956739508273152/unknown.png?width=658&height=492"
background[2].src = "https://media.discordapp.net/attachments/987761206448255016/987761232675221504/unknown.png?width=814&height=492"
background[3].src = "https://media.discordapp.net/attachments/987761206448255016/987873485378433094/unknown.png?width=798&height=492"
background[4].src = "https://media.discordapp.net/attachments/961066933669728257/975852377703845928/unknown.png?width=695&height=492"
background[5].src = "https://media.discordapp.net/attachments/961066933669728257/975867245781745725/unknown.png?width=895&height=492"
background[6].src = "https://media.discordapp.net/attachments/961066933669728257/975920303316287508/unknown.png?width=797&height=492"
background[7].src = "https://media.discordapp.net/attachments/961066933669728257/977626721614430238/unknown.png?width=795&height=492"
background[8].src = "https://media.discordapp.net/attachments/961066933669728257/978427197259939880/unknown.png?width=795&height=492"
background[9].src = "https://media.discordapp.net/attachments/961066933669728257/979823553400688640/unknown.png?width=795&height=492"
var objects = [
  new Image(),
  new Image(),
  new Image(),
  new Image(),
  new Image(),
  new Image()
]
objects[0].src = "https://media.discordapp.net/attachments/961066933669728257/964947850364600330/unknown.png"
objects[1].src = "https://media.discordapp.net/attachments/961066933669728257/977608333689253918/unknown.png"
objects[2].src = "https://media.discordapp.net/attachments/961066933669728257/977608297714688000/unknown.png"
objects[3].src = "https://media.discordapp.net/attachments/961066933669728257/977695241538793513/unknown.png"
objects[4].src = "https://media.discordapp.net/attachments/961066933669728257/983878957147496568/unknown.png"
objects[5].src = "https://media.discordapp.net/attachments/987761206448255016/987875332679942185/unknown.png"
var colors = [
  "blue",
  "purple",
  "elbeige"
]

var solid = [
  {"x": 439, "y": 609, "width": 470, "height": 214, "type": "solid", "room": 3}
]

var pond = [
  {
    "name": "Durick",
    "x": canvas.width/2,
    "y": canvas.height/2,
    "color": "blue",
    "image": new Image(),
    "ubicacionX": 0,
    "countSprite": 0,
    "invisible": false,
    "numero": 0,
    "numY": 0,
    "message": false,
    "outfit": [
      {"id": "i1", "img": new Image()},
      {"id": "i4", "img": new Image()},
      {"id": "i5", "img": new Image()}
    ]
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
    "numY": 0,
    "message": false,
    "outfit": [
      {"id": "i1", "img": new Image()}
    ]
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



function addName(nombre, color, ropa) {
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
    "numY": 0,
    "message": false,
    "outfit": ropa
  })
  generatePlayers()
}

function cargarCoins(){
  coinsPlayer.innerHTML = `coins: ${localStorage.getItem('coins')}`
}

function world() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  if (selectWorld == 1) {
    ctx.drawImage(background[1], 0, 0, canvas.width, canvas.height)
    catalog.style.visibility = "hidden"
    catalogRupple.style.visibility = "hidden"
    jugarPera.style.visibility = "hidden"
  } else if (selectWorld == 2) {
    ctx.drawImage(background[0], 0, 0, canvas.width, canvas.height)
    catalog.style.visibility = "hidden"
    catalogRupple.style.visibility = "hidden"
    jugarPera.style.visibility = "hidden"
  } else if (selectWorld == 3) {
    ctx.drawImage(background[3], -10, -10, canvas.width + 10, canvas.height + 10)
    catalog.style.visibility = "hidden"
    catalogRupple.style.visibility = "hidden"
    jugarPera.style.visibility = "hidden"
  } else if (selectWorld == 4) {
    ctx.drawImage(background[2], -10, -10, canvas.width + 10, canvas.height + 10)
    catalog.style.visibility = "hidden"
    catalogRupple.style.visibility = "hidden"
    jugarPera.style.visibility = "hidden"
  }else if (selectWorld == 5) {
    ctx.drawImage(background[4], 0, 0, canvas.width, canvas.height)
    catalog.style.visibility = "hidden"
    catalogRupple.style.visibility = "hidden"
    jugarPera.style.visibility = "hidden"
  }else if (selectWorld == 6) {
    ctx.drawImage(background[5], 0, 0, canvas.width, canvas.height)
    catalog.style.visibility = "hidden"
    catalogRupple.style.visibility = "hidden"
    jugarPera.style.visibility = "hidden"
    setTimeout(() =>{
      selectWorld = 9
    }, 10000)
  }else if (selectWorld == 9) {
    ctx.drawImage(background[6], 0, 0, canvas.width, canvas.height)
    catalogRupple.style.visibility = "hidden"
    jugarPera.style.visibility = "hidden"
    setTimeout(() =>{
      selectWorld = 4
    }, 10000)
  }else if (selectWorld == 100) {
    ctx.drawImage(background[7], 0, 0, canvas.width, canvas.height)
    catalog.style.visibility = "visible"
    catalogRupple.style.visibility = "hidden"
    jugarPera.style.visibility = "hidden"
  }else if (selectWorld == 101) {
    ctx.drawImage(background[8], 0, 0, canvas.width, canvas.height)
    catalogRupple.style.visibility = "visible"
    jugarPera.style.visibility = "hidden"
  }else if (selectWorld == 102) {
    ctx.drawImage(background[9], 0, 0, canvas.width, canvas.height)
    catalogRupple.style.visibility = "hidden"
    jugarPera.style.visibility = "visible"
  }
}

function colision(a, b){
  return a.x < b.x + b.width &&
         a.x + a.width > b.x &&
         a.y < b.y + b.height &&
         a.y + a.height > b.y;
}

function addObject(){
  if(selectWorld == 3){
    ctx.drawImage(objects[2], canvas.width-200, canvas.height-100, 200, 100)
    ctx.drawImage(objects[4], 50, canvas.height-210, 125, 200)
  }
  if(selectWorld == 4){
    ctx.drawImage(objects[5], -10, -5, canvas.width, 150)
  }
}

socket.on("connect", () => {
  console.log('hola usuario')
});


function addSolid(x, y, width, height, type, room) {
  this.x = x
  this.y = y
  this.width = width
  this.height = height
  this.type = type
  this.room = room
  solid.push({"x": this.x, "y": this.y, "width": this.width, "height": this.height, "type": this.type, "room": this.room})
}

function generateOutfit(player){
  var playerOutfit = player.outfit
  for(var i = 0; i < playerOutfit.length; i++){
    for(var l = 0; l < items.length; l++){
      var item = items[l]
      var outfit = player.outfit[i]
      if(outfit.id == item.id){
        ctx.drawImage(item.imgDuck, player.numero, player.numY, 28, 39, player.x, player.y, 50, 70)
      }
    }
  }
}

function generateName(player){
  ctx.fillStyle = "black"
  ctx.font="15px black arial"
  ctx.fillText(player.name, player.x, player.y + 75)
}

var solid1 = {"x": 315, "y": 355, "width": 305, "height": 95, "type": "solid", "room": 3}

function generatePlayers() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  world()
  for (var i = 0; i < pond.length; i++){
    ctx.fillStyle = pond[i].color
    ctx.drawImage(ejemIma, pond[i].numero, pond[i].numY, 28, 39, pond[i].x, pond[i].y, 50, 70)
    if(pond[i].message){
      generateName(pond[i])
      send(pond[i].message, pond[i].x-10, pond[i].y-20)
    }else{
      generateName(pond[i])
    }
    if(pond[i].outfit){
     generateOutfit(pond[i])
    }
    addObject()
  }
}

function cargarOutfit(name, outfit){
  for(var i = 0; i < pond.length; i++){
    if(pond[i].name == name){
      pond[i].outfit = JSON.parse(outfit)
      console.log('si se ejecuta outfit')
    }
    generatePlayers()
  }
}

function addItems(){
  var itemsJ = JSON.parse(localStorage.getItem('outfitSave'))
    divItems.innerHTML = ``
    for(var i = 0; i < itemsJ.length; i++){
      divItems.innerHTML += `
     <div class="item" onclick="ponerItem('${itemsJ[i].id}', '${itemsJ[i].tipo}')"><img src="${itemsJ[i].img}"></div>`
    }
}


canvas.addEventListener("click", function(evt){
  if(selectWorld == 100){
    for(var i = 0; i < pond.length; i++){
      if(pond[i].name == localStorage.getItem('name')){
         abrirShop()
    }
  }
  }
})



function positions() {
  for (var i = 0; i < pond.length; i++) {
    if (pond[i].x > canvas.width) {
      if(!pond[i].invisible){
        pond[i].x = canvas.width - 20
      }
      pond[i].x = canvas.width + 20
    }
    if (pond[i].y > canvas.height) {
      pond[i].y = canvas.height - 20
    }
    /*if (pond[i].x < 0) {
      pond[i].x = 0
    }*/
    if (pond[i].y < 110) {
      pond[i].y = 110
    }
    if (selectWorld == 1) {
      if (pond[i].x > 630) {
        pond[i].x = 610
      }
      if (pond[i].y < 200) {
        pond[i].y = 220
      }
      if (pond[i].y > canvas.height - 180) {
        pond[i].y = canvas.height - 210
      }
    }
  }
}

function ponerItem(ide, tipoe){
  var outfit = JSON.parse(localStorage.getItem('outfit'))
  var outfit2 = []
  for(var i = 0; i < outfit.length; i++){
  if(tipoe == outfit[i].tipo){
        outfit[i].id = ide
        outfit2.push(outfit[i])
    localStorage.setItem('outfit', JSON.stringify(outfit2))
      setTimeout(() =>{
        cargarOutfit(localStorage.getItem('name'), localStorage.getItem('outfit'))
      }, 1000)
    }else if(i == outfit.length-1){
     outfit.push({"id": ide, "tipo": tipoe})
     outfit2.push(outfit[i])
       localStorage.setItem('outfit', JSON.stringify(outfit2))
      setTimeout(() =>{
        cargarOutfit(localStorage.getItem('name'), localStorage.getItem('outfit'))
      }, 2000)
    }
  }

   swal.fire({
        title: "¡Te haz colocado el articulo correctamente!",
        icon: "success"
   })
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
        pond[i].x -= 10
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
         pond[i].y -= 10
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
         pond[i].x += 10
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
        pond[i].y += 10
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
   if(pond[i].name == localStorage.getItem('name')){
    if (pond[i].x > canvas.width - 10){
      if(selectWorld == 100){
        pond[i].x = canvas.width-10
      }else{
      selectWorld--
      pond[i].x = 480
      pond[i].y = 280
      generatePlayers()
     }
    }
    if (pond[i].x < 0) {
      selectWorld++
      pond[i].x = 480
      pond[i].y = 280
      generatePlayers()
    }
    if(selectWorld == 3){
      if(pond[i].y <= 250){
        if(pond[i].x < 90 && pond[i].x > 10){
          pond[i].y = 260
          selectWorld += 97
          pond[i].x = 480
          pond[i].y = 280
        }else if(pond[i].x <= canvas.width-50 && pond[i].x >= canvas.width-130){
          pond[i].y = 260
          selectWorld += 98
          pond[i].x = 480
          pond[i].y = 280
        }else if(pond[i].x <= 510 && pond[i].x >= 415){
          pond[i].y = 260
          selectWorld += 99
          pond[i].x = 480
          pond[i].y = 280
        }else{
          pond[i].y = 260
        }
      }
       if(colision(pond[i], solid1)){
        if(solid[l].type == "solid"){
           console.log('Colisión!')
        }
      }
    }
  if(selectWorld == 100){
      if(pond[i].y <= 110){
        if(pond[i].x < 750 && pond[i].x > 630){
          pond[i].y = 110
          selectWorld = 3
          pond[i].x = 480
          pond[i].y = 280
        }else{
          pond[i].y = 110
        }
      }
    if(pond[i].x <= 1){
      pond[i].x = 11
     }
    if(pond[i].y >= canvas.height-1){
      pond[i].y = canvas.height-11
     }
    }
     if(selectWorld == 101){
      if(pond[i].y <= 110){
        if(pond[i].x < 750 && pond[i].x > 630){
          pond[i].y = 110
          selectWorld = 3
          pond[i].x = 480
          pond[i].y = 280
        }else{
          pond[i].y = 110
        }
      }
    if(pond[i].x <= 1){
      pond[i].x = 11
     }
    if(pond[i].y >= canvas.height-1){
      pond[i].y = canvas.height-11
     }
    }
     if(selectWorld == 102){
      if(pond[i].y <= 110){
        if(pond[i].x < 750 && pond[i].x > 630){
          pond[i].y = 110
          selectWorld = 3
          pond[i].x = 480
          pond[i].y = 280
        }else{
          pond[i].y = 110
        }
      }
    if(pond[i].x <= 1){
      pond[i].x = 11
     }
    if(pond[i].y >= canvas.height-1){
      pond[i].y = canvas.height-11
     }
    }
   }
  }
}

function abrirPlayercard(){
  var divCard = document.querySelector('.overlay-playercard')
  divCard.style.visibility = "visible"
  divCard.style.opacity = 1
}

function cerrarPlayercard(){
  var divCard = document.querySelector('.overlay-playercard')
  divCard.style.visibility = "hidden"
  divCard.style.opacity = 0
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

function aplicarApodo() {
  if (apodo.value) {
    if (color.value) {
      if(!localStorage.getItem('outfit')){
       localStorage.setItem('outfit', [])
     }
    socket.emit('actualizar jugadores',
      localStorage.getItem('name'),
      localStorage.getItem('color'), localStorage.getItem('outfit'))
    addName(localStorage.getItem('name'), localStorage.getItem('color'), localStorage.getItem('outfit'))
      world()
      generatePlayers()
      socket.emit()
    }
  }
}

window.onload = function() {
  /* if(localStorage.getItem('name')){
    generatePlayers()
   */
  var loading = document.querySelector('.loading')
  loading.style.opacity = 0
  loading.style.visibility = "hidden"
  for(var i = 0; i < items.length; i++){
    items[i].imgDuck.src = items[i].imgDuckLink
  }

  if(localStorage.getItem('outfitSave')){
    addItems()
  }else{
    var newItem = [
      {"id":"i1", "tipo":"body", "img":"https://media.discordapp.net/attachments/961066933669728257/975818187276976138/unknown.png"}
    ]
    localStorage.setItem('outfitSave', JSON.stringify(newItem))
    addItems()
  }

  
  cargarCoins()
  if (!localStorage.getItem('name')) {
    overlay.classList.add('active')
  } else {
    overlay.classList.remove('active')
    if(!localStorage.getItem('outfit')){
    localStorage.setItem('outfit', JSON.stringify([{"id": "i1", "tipo": "body"}, {"id":"i100000000", "tipo":"neck"}, {"id":"i100000000", "tipo":"face"}, {"id":"i100000000", "tipo":"feet"}, {"id":"i100000000", "tipo":"hand"}, {"id":"i100000000", "tipo":"head"}]))
    }
    socket.emit('actualizar jugadores',
      localStorage.getItem('name'),
      localStorage.getItem('color'), JSON.parse(localStorage.getItem('outfit')))
    addName(localStorage.getItem('name'), localStorage.getItem('color'), JSON.parse(localStorage.getItem('outfit')))
  }
  aplicarApodo()
  world()
  generatePlayers()
  repeat()
  addMusic()
  animaciones()
}

world()

socket.on('actualizar jugadores', (nombre, color, outfit) => {
  console.log('se ejecuta actualizar')
  addName(nombre, color, outfit)
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