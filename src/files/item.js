function verArticulos(id){
  fetch('item.json')
    .then(respuesta => respuesta.json())
    .then(items => {
      items.forEach(item => {
        if(item.id === id){
          return item.imgDuck
        }else{
          return false
        }
      })
    })
}
