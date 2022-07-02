const Discord = require('discord.js')
module.exports = {
  name: "new",
  alias: ["newss", "newss2"],
  
 async execute(client, message, args){
    let notifiAc = message.guild.roles.cache.get("963086159796400158");
    var mensaje = args.join(' ')
    var permitido = "720840097947320330"
    var channelID = "961071317216559135"
    var channel = client.channels.cache.get(channelID)
     if(message.author.id != permitido)return message.channel.send(`¡No tienes permisos para usar este comando!`)
   
   const embed = new Discord.MessageEmbed()
   .setTitle("News - DuckBot")
   .setDescription(`
   ${mensaje}
`)
   .setTimestamp()
   .setColor("#0D47A1")
    channel.send({ embeds: [embed], content: `${notifiAc}` })
    .then(msg => {
        msg.react("👍")
        msg.react("👀")
        msg.react("964624090222714992")
        msg.react("964624104894365767")
        msg.react("986388322765131826")
    });
  }
}