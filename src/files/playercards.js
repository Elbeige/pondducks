var canvas = document.getElementById('playercard')
var ctx = canvas.getContext('2d')

var patoImg = new Image()
patoImg.src = 'https://media.discordapp.net/attachments/987156207712235580/991426297454673960/29_sin_titulo_20220618164902.png?width=360&height=492'

window.onload = () =>{
  ctx.fillStyle = "#2bffe1"
  ctx.fillRect(0,0,canvas.width,canvas.height)
  ctx.drawImage(patoImg, 1, -1, canvas.width, canvas.height)
}