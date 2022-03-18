const https = require('https')




const clientId = process.env['twitchClientID'];
const clientSecret = process.env['twitchClientSecret'];
var url = 'https://api.twitch.tv/helix/streams?user_id=125466430&first=1';




console.log('start');



function getTwitchAuthorization() {
    let url = `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`;


    https.post(url, res => {
      let data = '';
      res.on('data', chunk => {
        data += chunk;
      });
      res.on('end', () => {
        data = JSON.parse(data);
        console.log(data);
      })
    }).on('error', err => {
      console.log(err.message);
    })






  
  // // return fetch(url, { method: 'post'});
  //   return fetch(url, { method: 'post'}, function(error, meta, body){

  //     console.log(meta);
  //     // console.log(error.toString());
      
  //     console.log(body.toString());
  //     return body;




      
  //   });


  
    // return fetch(url, {
    // method: "POST",
    // })
    // .then((res) => res.json())
    // .then((data) => {
    //     return data;
    // });
}


console.log(getTwitchAuthorization());




// fetch(url, function(error, meta, body){
//     console.log(body.toString());
// });

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