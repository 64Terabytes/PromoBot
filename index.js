const request = require('request');
const clientId = process.env['twitchClientID'];
const clientSecret = process.env['twitchClientSecret'];
var streamsurl = 'https://api.twitch.tv/helix/streams?user_id=125466430&first=1';
var twitchAccessToken = "";



console.log('start');



function getTwitchAuthorization() {
  let authurl = `https://id.twitch.tv/oauth2/token`;

  request.post(
    authurl,
    {
      json: {
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "client_credentials"
      }
    },
    function(error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body["access_token"]);
        twitchAccessToken = body["access_token"];
        searchTwitchStreams();
      }
    }
  );
}

function searchTwitchStreams() {
  request.get(
    streamsurl, {
      auth: {
        bearer: twitchAccessToken,
        client_id: clientId
      }
    },
    function(error, response, body) {
      console.log(body);
      if (!error && response.statusCode == 200) {
        console.log(body);
      }
    }
  )
}


console.log(getTwitchAuthorization());


console.log('It worked hopefully');



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