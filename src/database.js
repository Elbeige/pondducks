const mongoose = require('mongoose')
const uri = process.env['MONGODB_URI'] 

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Base de Datos conectada.'))
.catch((err) => console.error(err))

