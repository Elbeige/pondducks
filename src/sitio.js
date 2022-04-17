module.exports = (app, express) =>{
  app.use('/', express.static(__dirname + '/files/'))
  
  app.get('/play', (req, res) =>{
    res.sendFile(__dirname + "/files/jugar.html")
    console.log('alguien entro a jugar')
  })

   app.get('/help', (req, res) =>{
    res.sendFile(__dirname + "/files/help.html")
    console.log('alguien entro a jugar')
  })
  
  app.get('/admin', (req, res) =>{
    res.sendFile(__dirname + "/files/admin.html")
    console.log('alguien entro al admin')
  })

  app.use(function (err, req, res, next){
    console.error(err.stack);
  res.status(500).send('Something broke!');
  })
  
}