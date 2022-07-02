
const Discord = require('discord.js')
require('../database.js')
const User = require('../files/user')

module.exports = {
  name: "duck2",
  alias: ["myduck2", "mipato2"],
  
 async execute(client, message, args){
   var username = args.join(' ')
   var user = await User.findOne({name: username})
   if(!user) return message.channel.send(`¡El usuario ${username} no se encontro, por favor, vuelva a intentarlo.!`)
   const embed = new Discord.MessageEmbed()
   .setTitle("Duck - DuckBot")
   .setDescription(`
   Informacion de ${username}.
   Monedas: ${user.money}
`)
   .setColor("#0D47A1")
     message.channel.send({ embeds: [embed] })
  }
}