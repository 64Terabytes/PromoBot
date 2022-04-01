const request = require('request');
const fetch = import('node-fetch');
const fs = require('fs');
global.Headers = fetch.Headers;
const clientId = process.env['twitchClientID'];
const clientSecret = process.env['twitchClientSecret'];
var streamsurl = 'https://api.twitch.tv/helix/search/channels?client_id=' + clientId + '&first=1&query=';
var twitchAccessToken = "";

var data = fs.readFileSync('data.json');
data = JSON.parse(data);


// console.log(data);

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
  for (const twitchUser in data.TwitchUsers) {
    console.log(twitchUser);
    console.log(data.TwitchUsers[twitchUser]['is_live']);
    // Copy the URL and add the username to the end

    // Call searchTwitchStream with the url

    // Console log the results eventually trun into discord message


    
  }
}

function searchTwitchStream(url) {
  const options = {
    url: url,
    headers: {
      'Client-Id': clientId,
      'Authorization': 'Bearer ' + twitchAccessToken
    }
  };
  request(
    options,
    function(error, response, body) {
      if (!error && response.statusCode == 200) {
        // Return body
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