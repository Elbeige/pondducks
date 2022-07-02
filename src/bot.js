module.exports = (express, app) =>{
 const Discord = require("discord.js")
 const intents = new Discord.Intents(32767)
 const client = new Discord.Client({ intents })

 require(__dirname + '/database.js')
 const User = require(__dirname + '/files/user')
  
 const fs = require("fs")
 const { readdirSync } = require("fs")

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync(__dirname + "/comandos").filter(file => file.endsWith(".js"))

for(const file of commandFiles){
  const command = require(`./comandos/${file}`)
  client.commands.set(command.name, command)
}

client.on("messageCreate", async (message) =>{
  if(message.channel.type == "dm") return;
  if(message.author.bot) return;
  let prefix = "="
  if(!message.content.startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase()

  let cmd = client.commands.find((c) => c.name === command || c.alias && c.alias.includes(command))

  if(cmd){
    cmd.execute(client, message, args)
  }
})
  
client.login(process.env.token)
}