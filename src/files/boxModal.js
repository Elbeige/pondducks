var box = getBoxModal()

function closeModal(overlay){
  var yhd = document.querySelector('.yhd')
  yhd.classList.remove('yhd')
}

function getBoxModal(){
  return {
    createModal: function (type, text){
      var modalOverlay = document.createElement('div')
      modalOverlay.classList.add('yhd')
      modalOverlay.style.position = "absolute"
      modalOverlay.style.top = "0"
      modalOverlay.style.left = "0"
      modalOverlay.style.right = "0"
      modalOverlay.style.bottom = "0"
      modalOverlay.style.background = "rgba(0,0,0,.3)"
      modalOverlay.style.display = "flex"
      modalOverlay.style.justifyContent = "center"
      modalOverlay.style.alignItems = "center"
      modalOverlay.innerHTML = `
        <div style="background:#f9f9f9;border-radius:5px;padding:5px;height:auto;width:40%;">
         <div style="width:100%;padding:2;display:flex;justify-content:center;">
          <p>${text}</p>
         </div>
        <div style="width:100%;height:auto;padding:5px;display:flex;justify-content:center;">
         <button style="border-radius:5px;border:none;background:#00ff89;color:white;padding:5px 10px;" onclick="closeModal()">OK</button>
        </div>
        </div>
       `
      return document.body.appendChild(modalOverlay)
    },
    
    createModalError: function (type, text){
      return alert(type, text)
    }
  }
}