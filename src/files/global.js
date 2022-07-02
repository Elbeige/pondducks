var global = document.querySelector('.global')
var global_titulo = document.querySelector('.global-title')
var global_texto = document.querySelector('.global-text')
var global_boton = document.querySelector('.global-button')

var global_shop = document.querySelector('.global-shop')
var global_shop_title = document.querySelector('.shop-global-title')

var object;

function sendGlobal(titulo, texto){
  socket.emit('sendGlobal', titulo, texto)
}

function closeGlobal(){
  global.classList.remove('active')
}

function shopGlobal(nameObject){
  global_shop.classList.add('active')
  global_shop_title.innerHTML = `¿Quieres llevar ${nameObject}?`
  object = nameObject
}

function shopCloseGlobal(nameObject){
  global_shop.classList.remove('active')
}

function comprar(img, id, tipo){
  var outfitSave = JSON.parse(localStorage.getItem('outfitSave'))
  var hola = outfitSave
  Swal.fire({
    title: '¿Quieres comprar este articulo?',
    showCancelButton: true,
    confirmButtonText: 'Si',
    cancelButtonText: `No`,
  }).then((result) => {
  /* Read more about isConfirmed, isDenied below */
   if (result.isConfirmed) {
     Swal.fire('Comprado!', '', 'success')
     hola.push({"id":id, "tipo": tipo, "img": img})
     localStorage.setItem('outfitSave', JSON.stringify(hola))
     addItems()
   }
})
}

function comprarItot(img, id, tipo, precio){
  var outfitSave = JSON.parse(localStorage.getItem('outfitSave'))
  var hola = outfitSave
  var TempyCoins = JSON.parse(localStorage.getItem('ITOTMoney'))
  var newTempyCoins = TempyCoins -= precio
  if(newTempyCoins <= 0)return alert('¡No tienes suficientes monedas!')
  Swal.fire({
    title: '¿Quieres comprar este articulo?',
    showCancelButton: true,
    confirmButtonText: 'Si',
    cancelButtonText: `No`,
  }).then((result) => {
  /* Read more about isConfirmed, isDenied below */
   if (result.isConfirmed) {
     Swal.fire('Comprado!', '', 'success')
     hola.push({"id":id, "tipo": tipo, "img": img})
     localStorage.setItem('outfitSave', JSON.stringify(hola))
     addItems()
     localStorage.setItem('ITOTMoney', newTempyCoins)
   }
})
}

function comprarRupple(img, id, tipo){
  var rupples = JSON.parse(localStorage.getItem('rupples'))
  var hola = rupples
  Swal.fire({
    title: '¿Quieres comprar este Rupple?',
    showCancelButton: true,
    confirmButtonText: 'Sí',
    cancelButtonText: `No`,
  }).then((result) => {
  /* Read more about isConfirmed, isDenied below */
   if (result.isConfirmed) {
     Swal.fire('Comprado!', '', 'success')
     hola.push({"id":id, "tipo": tipo, "img": img})
     localStorage.setItem('rupples', JSON.stringify(hola))
     addRupples()
   }
})
}

socket.on('sendGlobal', (titulo, texto) =>{
  global.classList.add('active')
  global_titulo.innerHTML = titulo
  global_texto.innerHTML = texto
})