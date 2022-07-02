module.exports = (app, express, stripe) =>{
  app.use('/', express.static(__dirname + '/files/'))

  app.use(express.urlencoded({
   extended: true
  }))
  require(__dirname + '/database.js')
  const User = require(__dirname + '/files/user')


  app.get('/play', (req, res) =>{
    res.sendFile(__dirname + "/files/jugar.html")
    console.log('alguien entro a jugar admin2')
  
  })

   app.get('/arreglar', (req, res) =>{
    res.sendFile(__dirname + "/files/arreglar.html")
    console.log('alguien entro a jugar admin2')
  })

  app.get('/download', (req, res) =>{
    res.sendFile(__dirname + "/files/download.html")
    console.log('alguien entro a descargar')
  })

  app.get('/jugar', (req, res) =>{
    var username = req.body.duck_username
    res.sendFile(__dirname + '/files/jugarIframe.html')
    console.log('alguien entro a jugar')
  })

  app.get('/startscreen', (req, res) =>{
    res.sendFile(__dirname + '/files/screen.html')
    console.log('alguien entro a startscreen')
  })

  app.get('/adminJugar', (req, res) =>{
    res.sendFile(__dirname + '/files/adminJugar.html')
    console.log('alguien entro a startscreen')
  })
  
  app.post('/login/finish', async (req, res) =>{
    var username = req.body.duck_username
    var pass = req.body.duck_pass
    
    var user = await User.findOne({name: username})
    console.log(user)
    if(!user){
      res.send(`El usuario no se encontro, vuelva a <a href="/login">intentarlo</a>.`)
    }else if(user.password !== pass){
      res.send(`Contraseña incorrecta, vuelva a <a href="/login">intentarlo</a>.`)
    }else{
      res.send(`
   <h1>Cargando...</h1>
   <script>
    sessionStorage.setItem('name', '${username}')
    setTimeout(() =>{
     location.href = "/jugar"
    }, 3000)
   </script>
   `)
    }
    console.log('alguien entro a iniciar sesion y ya termino.')
  })

   app.post('/login/finish2', async (req, res) =>{
    var username = req.body.duck_username
    var pass = req.body.duck_pass
    
    var user = await User.findOne({name: username})
 

    if(!user){
      res.send(`El usuario no se encontro, vuelva a <a href="/loginPlay">intentarlo</a>.`)
    }else if(user.password !== pass){
      res.send(`Contraseña incorrecta, vuelva a <a href="/loginPlay">intentarlo</a>.`)
    }else{
      res.send(`
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
  <div style="width:100%;height:100%;display:flex;justify-content:center;align-items:center;">
  <div class="spinner-border text-info" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
<div>
   <script>
    localStorage.setItem('name', '${username}')
    localStorage.setItem('coins', '${user.money}')
    setTimeout(() =>{
     location.href = "/play"
    }, 3000)
   </script>
   `)
    }
    console.log('alguien entro a iniciar sesion y ya termino.')
  })

   app.post('/play/finish', async (req, res) =>{
    var username = req.body.duck_username
    var pass = req.body.duck_pass
    
    var user = await User.findOne({name: username})

    var mone;
    var outfit;
    var username;
     
    res.send(`se cerró sesion correctamente.
    `)

    
     
    console.log('alguien entro a cerrar sesión.')
  })
  
   app.get('/login', (req, res) =>{
    res.sendFile(__dirname + "/files/adminJugar.html")
    console.log('alguien entro a ingresar')
  })

   app.get('/loginPlay', (req, res) =>{
    res.sendFile(__dirname + "/files/loginPlay.html")
    console.log('alguien entro a ingresar')
  })
  
   app.get('/help', (req, res) =>{
    res.sendFile(__dirname + "/files/help.html")
    console.log('alguien entro a jugar')
  })
  
  app.get('/admin', (req, res) =>{
    res.sendFile(__dirname + "/files/admin.html")
    console.log('alguien entro al admin')
  })

  app.get('/register', (req, res) =>{
    res.sendFile(__dirname + "/files/register.html")
    console.log('alguien entro al registro')
  })

   app.get('/prueba', (req, res) =>{
    res.sendFile(__dirname + "/files/regfinish.html")
    console.log('alguien entro al registro')
  })
  
  app.get('/0712', (req, res) =>{
    res.sendFile(__dirname + "/files/jugar.js")
  })

  app.post('/register/finish', async(req, res) =>{
    var email = req.body.duck_email
    var password = req.body.duck_password
    var name = req.body.duck_name

    var user = await User.findOne({name: name})
    
    if(user)return res.send(`
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel="stylesheet" href="files/estilos.css"/>
    <style>
      body{
        background: none;
        display:flex;
        justify-content:center;
        align-items: center;
      }

      .welcome{
        display:flex;
        justify-content:center;
        font-size:23px;
        font-wegith: bold;
      }

      .parteCon{
        display:flex;
        justify-content: center;
        padding: 5px;
      }

      .parte{
        width:50%;
      }

      .text{
        width:250px;
        height:40px;
        outline-color: #6ecbd5;
        border-radius:5px;
        border: solid 2px #e5e5e5;
      }
</style>
 <div style="background:#56d7c4;width:900px;height: auto;padding:10px;display:flex;justify-content:center;align-items:center;border-radius:5px;">
   <form style="width:100%;height:400px;background:white;border-radius:5px;padding:5px;margin: 10 auto;" action="/register/finish" method="post">
    <div class="welcome">
      Rellena todo lo necesario en el formulario.
    </div><br>
    <div class="parteCon">
     <div class="parte">
       <div style="width:250px;height:auto;border:solid 2px #6ecbd5;background:#56d7c4;border-radius:5px;">
         Pond Ducks es un Video Juego dirigido a publico infantil desde los 5 años, no se permite nombres o contraseñas inapropiadas o usted sera prohibido. Tenemos una comunidad segura donde no toleramos Acoso, Abuso, etc.
       </div><br>
       Escribe el nombre de tu pato
       <input type="text" class="text" placeholder="Escribe el nombre de tu pato" name="duck_name" required><br>
       <span style="color: red;">¡Ese nombre ya está en uso!</span>
       <li>¡Recuerda no ingresar tu nombre real!</li>
     </div>
     <div class="parte">
       Escribe el correo electronico de tus padres
       <input type="email" class="text" placeholder="Escribe el correo" name="duck_email" required><br>
<br>
       Escribe la contraseña para tu pato:
       <input type="password" class="text" placeholder="Contraseña" name="duck_password" required><BR>
       <li>Recuerda no revelar tu contraseña a nadie</li><br>
       Vuelva a escribir la contraseña:
       <input type="password" class="text" placeholder="Repita su contraseña"><br>
       <div style="display:flex;justify-content:flex-end;">
         <button class="button">¡Listo!</button>
       </div>
     </div>
    </div>
   </form>
 </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
  </body>
</html>`)
    res.sendFile(__dirname + '/files/regfinish.html')
    var newUser = new User({name, email, password})
    await newUser.save()
  })

   app.get('/game01', async(req, res) =>{
    res.sendFile(__dirname + '/files/memoria.html')
  })

  app.get('/membership', async(req, res) =>{
    res.sendFile(__dirname + '/files/membership.html')
  })

  app.get('/cardsTime', (req, res) =>{
    res.sendFile(__dirname + '/files/cardsTime.html')
  })
   app.get('/memoryTime', (req, res) =>{
    res.sendFile(__dirname + '/files/memoryTime.html')
  })
   app.get('/cardsTempy', (req, res) =>{
    res.sendFile(__dirname + '/files/cardsTempy.html')
  })

  app.post('/payment', async(req, res) =>{
    var username = req.body.duck_name
    var pass = req.body.duck_pass
    
    var user = await User.findOne({name: username})

    if(!user){
      res.send(`El usuario no se encontro, vuelva a <a href="/membership">intentarlo</a>.`)
    }else if(user.password !== pass){
      res.send(`Contraseña incorrecta, vuelva a <a href="/membership">intentarlo</a>.`)
    }else{
      res.sendFile(__dirname + '/files/membership.html')
  }
  })

  app.get('/nosexd', async(req, res) =>{
   res.send(`
listo :3
     <script>
      function comprar(img, id, tipo){
  var outfitSave = JSON.parse(localStorage.getItem('outfitSave'))
  var hola = outfitSave
     hola.push({"id":id, "tipo": tipo, "img": img})
     localStorage.setItem('outfitSave', JSON.stringify(hola))
 }
comprar("https://media.discordapp.net/attachments/976138269198807092/987427461065224273/unknown.png", "i10","rupple")
     </script>
  `) 
  })
  
  app.post('/accept', (req, res) =>{
        // like Address, Name, etc from form
    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken,
        name: 'Gourav Hammad',
        address: {
            line1: 'TC 9/4 Old MES colony',
            postal_code: '452331',
            city: 'Indore',
            state: 'Madhya Pradesh',
            country: 'India',
        }
    })
    .then((customer) => {
  
        return stripe.charges.create({
            amount: 200,     // Charing Rs 25
            description: 'Membership Infinite',
            currency: 'USD',
            customer: customer.id
        });
    })
    .then((charge) => {
        res.send(__dirname + '/files/payfinish.html')  // If no error occurs
    })
    .catch((err) => {
        res.send('Ocurrio un error, pastístico, por favor intente más tarde.')       // If some error occurs
    });
})
  
  app.use(function (err, req, res, next){
    console.error(err.stack);
  res.status(500).send('Something broke!');
  })
  
}