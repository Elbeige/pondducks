const Discord = require('discord.js')
require('../database.js')
const User = require('../files/user')

module.exports = {
  name: "work",
  alias: ["trabajar", "monedas"],
  
 async execute(client, message, args){
    var username = args.join(' ')
    var user = await User.findOne({name: username})
    if(!username)return message.channel.send('¡Menciona a tu usuario!. Tambien puedes mencionar a tus amigos y transferirle el dinero.')

    if(!user)return message.channel.send(`¡El usuario ${username} no a sido encontrado!`)
   
    var workSelect = ["Ducksi-chef", "Ducksi-Taxista", "Ducksi-piloto", "Ducksi-contructor"]
    var work = Math.floor(Math.random()*workSelect.length);
    var userMoney = user.money
    var money = Math.floor(Math.random() * 20);
    var mone = userMoney += money
    var edit = await User.updateOne({name: username}, {money: mone})
   const embed = new Discord.MessageEmbed()
   .setTitle("Work - DuckBot")
   .setDescription(`¡Haz trabajado como ${workSelect[work]} y ganastes ${money} <:Moneda_PD:970386029213257798>!`)
   .setColor("#0D47A1")
     message.channel.send({ embeds: [embed] })
  }
}