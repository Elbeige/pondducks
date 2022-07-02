document.addEventListener('keydown', (evt) =>{
  move(evt)
})

var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')

var player = {
  "x": 100,
  "y": 100,
  "width": 10,
  "height": 10,
  "color": "blue"
}

var solid = {
  "x": 200,
  "y": 100,
  "width": 30,
  "height": 30,
  "color": "black"
}

function generatePlayers() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  if(colision(player, solid)){
    ctx.fillStyle = "red"
    ctx.fillRect(player.x, player.y, player.width, player.height)
  }else{
  ctx.fillStyle = player.color
  ctx.fillRect(player.x, player.y, player.width, player.height)
  }
    ctx.fillStyle = solid.color
  ctx.fillRect(solid.x, solid.y, solid.width, solid.height)
}

function colision(a, b){
  return a.x < b.x + b.width &&
         a.x + a.width > b.x &&
         a.y < b.y + b.height &&
         a.y + a.height > b.y;
}

function move(e){
  if(e.keyCode == 37){
    player.x -= 2
  }else if(e.keyCode == 38){
    player.y -= 2
  }else if(e.keyCode == 39){
    player.x += 2
  }else if(e.keyCode == 40){
    player.y += 2
  }
  generatePlayers()
}

canvas.width = 1000
canvas.height = 500

generatePlayers()