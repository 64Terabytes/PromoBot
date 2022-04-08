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

const discord = require("discord.js")
const client = new discord.Client({
  intents: [
    "GUILDS",
    "GUILD_MESSAGES"
  ]
})

const ChannelID = "952482286555783209"

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
  // -----------------------------------------
  // THIS IS WHERE WE SEND THE DISCORD MESSAGE
  // -----------------------------------------
  data.messages.forEach(sendDiscordMessage)


  
  console.log("I AM VERY OBVIOUSE MESSAGE")
  console.log(data.messages)

  
  
})

function sendDiscordMessage(message) {
  client.channels.cache.get(ChannelID).send(message);
}

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
    var searchURL = streamsurl + twitchUser;
    // Call searchTwitchStream with the url
    searchTwitchStream(searchURL);
    // Console log the results eventually trun into discord message


  }
}

function processTwitchData(twitchData) {
  var newData = JSON.parse(twitchData)
  var selUser = newData["data"][0]["broadcaster_login"]
  var selDisplay = newData["data"][0]["display_name"]
  var selTitle = newData["data"][0]["title"]
  var selIsLive = newData["data"][0]["is_live"]


  // console.log(newData)

  // Check againts database
  if (data.TwitchUsers[selUser]["is_live"] == selIsLive) {
    console.log(selUser, selIsLive, "is a match")
    return
  } else {
    // Update database
    data.TwitchUsers[selUser]["is_live"] = selIsLive
    try {
      fs.writeFileSync('data.json', JSON.stringify(data))
      //file written successfully
    } catch (err) {
      console.error(err)
    }

    // Do we send a message
    if(selIsLive) {
      // ------------------
      // SEND MESSAGE HERE
      // ------------------
      
      
      
      
      var liveMessage = selDisplay + " Is live: " + selTitle + " at https://twitch.tv/" + selUser
      data.messages.push(liveMessage);





      
      console.log(liveMessage)      
    }


    console.log("Updating Database for", selUser)




  }



  console.log(data.TwitchUsers[selUser]["is_live"])
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
        processTwitchData(body);
      }
    }
  )
}


console.log(getTwitchAuthorization());


console.log('It worked hopefully');





client.on("messageCreate", (message) => {
  if (message.content == "hi") {
    message.guild.channels.cache.get(ChannelID).send(`A bunch of stuff`)
  }
})


client.login(process.env['DiscordBotToken'])