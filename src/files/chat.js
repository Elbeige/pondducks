var socket = io()

var chat = document.querySelector('.chat')
var message = document.querySelector('.modal-footer .message')
function sendMessage(){
  if(message.value){
  socket.emit('sendMessage', message.value, localStorage.getItem('name'))
  message.value = ""
  }
}

socket.on('sendMessage', (message, author) =>{
  chat.innerHTML += `<div class="messages"><p><strong>${author}: </strong>${message}</p></div>`
})