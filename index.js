

const authProvider = process.env['twitchClientID'] + process.env['twitchClientSecret']

console.log(authProvider)

const discord = require("discord.js")
const client = new discord.Client({
  intents: [
    "GUILDS",
    "GUILD_MESSAGES"
  ]
})








client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

const ChannelID = "952482286555783209"

client.on("messageCreate", (message) => {
  if (message.content == "hi") {
    message.guild.channels.cache.get(ChannelID).send(`When the imposter is sus`)
  }
})


client.login(process.env['DiscordBotToken'])