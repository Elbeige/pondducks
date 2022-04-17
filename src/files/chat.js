var socket = io()

var chat = document.querySelector('.modal-body')
var message = document.querySelector('.message')
function sendMessage(){
  if(message.value){
  socket.emit('sendMessage', message.value, localStorage.getItem('name'))
  message.value = ""
  }
}

socket.on('sendMessage', (message, author) =>{
  chat.innerHTML += `<div class="messages"><strong>${author}: </strong>${message}</div>`
})