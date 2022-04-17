
var global = document.querySelector('.global')
var global_titulo = document.querySelector('.global-title')
var global_texto = document.querySelector('.global-text')
var global_boton = document.querySelector('.global-button')
function sendGlobal(titulo, texto){
  socket.emit('sendGlobal', titulo, texto)
}

function closeGlobal(){
  global.classList.remove('active')
}

socket.on('sendGlobal', (titulo, texto) =>{
  global.classList.add('active')
  global_titulo.innerHTML = titulo
  global_texto.innerHTML = texto
})