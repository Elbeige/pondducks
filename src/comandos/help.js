const Discord = require('discord.js')

module.exports = {
  name: "help",
  alias: ["ayuda", "info"],
  
  execute(client, message, args){
   const embed = new Discord.MessageEmbed()
   .setTitle("HELP - DuckBot")
   .setDescription(`¡Hola!. Soy **DuckBot**, bot oficial del Mundo Virtual Pond Ducks.
    `)
   .addField("PING", "Te muestra el ping.")
   .addField("DUCK", "Ve información del pato mencionado.")
   .addField("WORK", "Trabaja para ganar monedas.")
   .setColor("#0D47A1")
     message.channel.send({ embeds: [embed] })
  }
}