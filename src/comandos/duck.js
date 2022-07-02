
const Discord = require('discord.js')
require('../database.js')
const User = require('../files/user')

module.exports = {
  name: "duck",
  alias: ["myduck", "mipato"],
  
 async execute(client, message, args){
   var username = args.join(' ')
   var user = await User.findOne({name: username})
   if(!user) return message.channel.send(`¡El usuario ${username} no se encontro, por favor, vuelva a intentarlo.!`)
   const embed = new Discord.MessageEmbed()
   .setTitle("Duck - DuckBot")
   .setDescription(`
   Informacion de ${username}.
   Monedas: ${user.money}.
   ¿Esta prohibido?: ${user.banned}.
   ¿Esta silenciado?: ${user.muted}.
   ¿Es admin?: ${user.admin}.
   ¿Es moderador?: ${user.mod}.
   Cantidad de premios: ${user.premios.length}.
`)
   .setFooter('False = No, True = Si.')
   .setColor("#0D47A1")
   if(user.name == "elbeige"){
      message.channel.send('Este usuario es el admin del juego. <a:Corona:986015700000854088>')
    }
     message.channel.send({ embeds: [embed] })
  }
}