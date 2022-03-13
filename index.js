const Discord = require('discord.js')
const client = new Discord.Client({
  intents: [
    "GUILDS",
    "GUILD_MESSAGES"
  ]
})

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on("messageCreate", (message) => {
  if (message.content == "hi"){
    message.reply("Hello World")
  }
})



const ChannelID = "952482286555783209"

client.on("messageCreate", (message) => {
  if (message.content == "hi"){
    message.guild.channels.cache.get(ChannelID).send(`When the imposter is sus`)
  }
})







client.login(process.env['DiscordBotToken'])