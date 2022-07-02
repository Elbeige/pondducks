const mongoose = require('mongoose')
const { Schema } = mongoose

var UserSchema = new Schema({
  name: { type: String, required: true},
  email: { type: String, required: true},
  password: { type: String, required: true},
  money: {type: Number, default: 500},
  outfit: {type: Array, default: [{"id": "i1", "tipo": "body"}]},
  banned: {type: Boolean, default: false},
  muted: {type: Boolean, default: false},
  admin: {type: Boolean, default: false},
  mod: {type: Boolean, default: false},
  socio: {type: Boolean, default: false},
  premios: {type: Array},
  inventory: {type: Array, default: [{"id": "i1", "tipo": "body", "img": "https://media.discordapp.net/attachments/966014531199463505/966014551894138910/unknown.png"}]}
})

module.exports = mongoose.model('User', UserSchema)