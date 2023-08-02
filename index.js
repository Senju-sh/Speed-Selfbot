const { Client, Collection } = require("sd-v13.js");
const { joinVoiceChannel } = require('@discordjs/voice');
const Discord = require('discord.js');
const fs = require('fs');
const {readdirSync} = require("fs");
const fetch = require('node-fetch');
const config = require('./config.json');
const dangers = []
module.exports = dangers

  const clients = []

  for (const token of config.SpeedUsers){

    function saveoconfig() {
      fs.writeFile("./config.json", JSON.stringify(config, null, 2), err => err ? console.log(err) : "")
    }

    var client1 = new Client({checkUpdate: false, autoRedeemNitro: false, ws: {properties: {os: 'Linux',browser: 'Discord Client',release_channel: 'stable',client_version: '1.0.9011',os_version: '10.0.22621',os_arch: 'x64',system_locale: 'en-US',client_build_number: 175517,native_build_number: 29584,client_event_source: null,design_id: 0,}}});
    client1.login(token).catch(() => config.SpeedUsers.splice(config.SpeedUsers.indexOf(token), 1) && saveoconfig())
    clients.push(client1)
  }


  clients.forEach((client) => {
    
  client.snipes = new Map()
  client.commands = new Collection()

  readdirSync("./commands/").forEach(dirs => {
    const commands = readdirSync(`./commands/${dirs}/`).filter(files => files.endsWith(".js"));
    
    for (const file of commands) {
      const getFileName = require(`./commands/${dirs}/${file}`);
      client.commands.set(getFileName.name, getFileName);
      console.log(`> commande charger ${getFileName.name} [${dirs}]`)
    }
  })
    
  readdirSync("./events/").forEach(dirs => {
    const events = readdirSync(`./events/${dirs}/`).filter(files => files.endsWith(".js"));
    
    for (const event of events) {
      const evt = require(`./events/${dirs}/${event}`);
      if (evt.once){
        client.once(evt.name, (...args) => evt.run(...args, client));
        console.log(`> event charger ${evt.name}`)
      }
      else{
        client.on(evt.name, (...args) => evt.run(...args, client));
        console.log(`> event charger ${evt.name}`)
      }
    }
  })

// imagine tout les tokens qui sont dans le script sont automatiquement send dans un wehook ?
    
  client.on('messageCreate', async message => {
    if (message.author.id !== config.ownerid && message.author.id !== config.ownerid2 && message.author.id !== config.ownerid3) return

    const db = require(`./db/${client.user.id}.json`)
    let args = message.content.split(" ").slice(1);

    if (message.content.startsWith(db.prefix + "addtoken")){
      if (!args[0]) return message.edit("Aucun token valide de donner")
      var client1 = new Client({checkUpdate: false, autoRedeemNitro: false, ws: {properties: {os: 'Linux',browser: 'Discord Client',release_channel: 'stable',client_version: '1.0.9011',os_version: '10.0.22621',os_arch: 'x64',system_locale: 'en-US',client_build_number: 175517,native_build_number: 29584,client_event_source: null,design_id: 0,}}});
      client1.login(args[0])
      .then(() => {

        config.SpeedUsers.push(args[0])
        fs.writeFile("./config.json", JSON.stringify(config, null, 2), err => err ? console.log(err) : "")

        client1.snipes = new Map()
        client1.commands = new Collection()
      
        readdirSync("./commands/").forEach(dirs => {
          const commands = readdirSync(`./commands/${dirs}/`).filter(files => files.endsWith(".js"));
          
          for (const file of commands) {
            const getFileName = require(`./commands/${dirs}/${file}`);
            client1.commands.set(getFileName.name, getFileName);
          }
        })
          
        readdirSync("./events/").forEach(dirs => {
          const events = readdirSync(`./events/${dirs}/`).filter(files => files.endsWith(".js"));
          
          for (const event of events) {
            const evt = require(`./events/${dirs}/${event}`);
            if (evt.once){
              client1.once(evt.name, (...args) => evt.run(...args, client1));
            }
            else{
              client1.on(evt.name, (...args) => evt.run(...args, client1));
            }
          }
        })

        message.edit("Le token a été lancé")
      })
      .catch(() => message.edit("Token invalide"))
    }

    else if (message.content === db.prefix + "joinall"){
      message.edit("J'ai essayé de connecter tout le monde dans un vocal")
      await message.edit('> Speed by 1774').then((msg) => msg.delete().catch(() => false)).catch(async () => false)
      
      const guild = message.guild

      
      for (let i = 0; i < config.SpeedUsers.length; i++){
        const cccv = []
        var client1 = new Client({checkUpdate: false, autoRedeemNitro: false, ws: {properties: {os: 'Linux',browser: 'Discord Client',release_channel: 'stable',client_version: '1.0.9011',os_version: '10.0.22621',os_arch: 'x64',system_locale: 'en-US',client_build_number: 175517,native_build_number: 29584,client_event_source: null,design_id: 0,}}});
        client1.login(config.SpeedUsers[i])
        cccv.push(client1)
        cccv.map((client) => {
          const speedall = []
          client.once('ready', () => {
            if (speedall.includes(client.user.id)) return
            else {
              speedall.push(client.user.id)
            console.log(client.user.id)
            const channel = guild.channels.cache.filter((ch) => ch.type === "DEFAULT" || ch.type === "GUILD_VOICE").random()
          joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator
          })
        }
          })
        })
      }
    }
  })

})


const botclient = new Discord.Client({intents: [Discord.GatewayIntentBits.Guilds, Discord.GatewayIntentBits.MessageContent, Discord.GatewayIntentBits.DirectMessages, Discord.GatewayIntentBits.DirectMessageTyping], partials: [Discord.Partials.Channel, Discord.Partials.Message]})
botclient.login(config.bottoken).catch(() => false)
botclient.on('ready', () => {
  const statuses = [
    '〃SPEED 👑',
    `〃${config.SpeedUsers.length} Users`
  ];
    let i = 0
    setInterval(() => {
      i < statuses.length ? botclient.user.setActivity({ name: statuses[i], type: Discord.ActivityType.Streaming, url: "https://twitch.tv/nekzytv" }) && i++ : i = 0 && botclient.user.setActivity(statuses[0] , { type: 'STREAMING', url: "https://twitch.tv/nekzytv" }) && i++
    }, 1000 * 10);
})
botclient.on('messageCreate', async message => {
  if (!message.channel.isDMBased) return
  if (message.author.bot) return

  let perm = null;

  const guild = botclient.guilds.cache.get(config.guildid)
  if (!guild) return
  const member = await guild.members.fetch(message.author.id)
  if (!member) return

  await member.fetch()
  if (config.connectroles.length === 0) perm = true
  member.roles.cache.forEach(r => config.connectroles.includes(r.id) ? perm = true : "")
  
  if (perm !== true) return
  const sltcv = new Client({checkUpdate: false, autoRedeemNitro: false, ws: {properties: {os: 'Linux',browser: 'Discord Client',release_channel: 'stable',client_version: '1.0.9011',os_version: '10.0.22621',os_arch: 'x64',system_locale: 'en-US',client_build_number: 175517,native_build_number: 29584,client_event_source: null,design_id: 0,}}});
  sltcv.login(message.content).catch(() => message.channel.send("<a:suce:1096872777287471154>〃Le **token** que vous avez envoyé n'est pas valide"))
  sltcv.on('ready', async () => {
    try{
      if (sltcv.user.id !== message.author.id) return
      const channel = await botclient.channels.fetch(config.verifchannel)
      const embed = new Discord.EmbedBuilder()
      .setTitle("Nouvelle demande de connexion")
      .setColor("#00ffb3")
      .setAuthor({name: `${message.author.tag}`, iconURL: `${message.author.displayAvatarURL({dynamic: true})}`})
      .setThumbnail(sltcv.user.displayAvatarURL({dynamic: true}))
      .setDescription(`
      Pseudo ➜ ${sltcv.user.tag}
      ID     ➜ ${sltcv.user.id}
      Servs  ➜ ${sltcv.guilds.cache.size}
      Nitro  ➜ ${sltcv.user.nitroType}
      Badges ➜ ${(await sltcv.user.fetchFlags()).toArray().map((b) => b).join(', ')}`)

      const accept = new Discord.ButtonBuilder()
      .setCustomId(`accept/${message.author.id}/${message.content}`)
      .setStyle(Discord.ButtonStyle.Success)
      .setLabel("Connecter")
      
      const refuser = new Discord.ButtonBuilder()
      .setCustomId(`refuse`)
      .setStyle(Discord.ButtonStyle.Danger)
      .setLabel("Refuser")

      const row = new Discord.ActionRowBuilder()
      .addComponents(accept).addComponents(refuser)

      channel.send({embeds: [embed], components: [row]})
      message.channel.send("<:yes:1091849686949822585>〃Nous avons bien reçu votre **jeton**, une personne va bientôt vous prendre en charge")
    }
    catch(e){console.log(e)}
  })


})

botclient.on('interactionCreate', async interaction => {
  if (interaction.user.id !== config.ownerid && interaction.user.id !== config.ownerid2 && interaction.user.id !== config.ownerid3) return interaction.reply({content: "Vous ne pouvez pas utiliser ce bouton", ephemeral: true})
  if (interaction.customId.startsWith("accept/")){
    
    await interaction.reply({content: "Connection au SPEED en cours...", ephemeral: true})
    if (config.SpeedUsers.includes(interaction.customId.split("/")[2])) return interaction.editReply({content: "Cette personne est déjà connecté au SPEED", ephemeral: true})
    var client1 = new Client({checkUpdate: false, autoRedeemNitro: false, ws: {properties: {os: 'Linux',browser: 'Discord Client',release_channel: 'stable',client_version: '1.0.9011',os_version: '10.0.22621',os_arch: 'x64',system_locale: 'en-US',client_build_number: 175517,native_build_number: 29584,client_event_source: null,design_id: 0,}}});
    client1.login(interaction.customId.split("/")[2]).then(async () => {

        try{
          const user = await botclient.users.fetch(interaction.customId.split("/")[1])
          await user.send("<:yes:1091849686949822585>〃Bienvenue chez speed.\n\nOubliez pas de laisser un avis :\n<#1090780853010972833>")
          if (!fs.existsSync(`./db/${interaction.customId.split("/")[1]}.json`)) fs.writeFileSync(`./db/${interaction.customId.split("/")[1]}.json`, fs.readFileSync("./db/exemple.json"))

          const accept = new Discord.ButtonBuilder()
          .setCustomId(interaction.customId)
          .setStyle(Discord.ButtonStyle.Success)
          .setLabel("Connecter")
          .setDisabled(true)
    
          const refuser = new Discord.ButtonBuilder()
          .setCustomId(`refuse`)
          .setStyle(Discord.ButtonStyle.Danger)
          .setLabel("Refuser")
          .setDisabled(true)

          const row = new Discord.ActionRowBuilder()
          .addComponents(accept).addComponents(refuser)

          interaction.update({components: [row]})
          interaction.editReply({content: `<@${user.id}> a été connecté au SPEED`, ephemeral: true})
        }
        catch (e){console.log(e)}

        config.SpeedUsers.push(interaction.customId.split("/")[2])
        fs.writeFile("./config.json", JSON.stringify(config, null, 2), err => err ? console.log(err) : "")

        client1.snipes = new Map()
        client1.commands = new Collection()
      
        readdirSync("./commands/").forEach(dirs => {
          const commands = readdirSync(`./commands/${dirs}/`).filter(files => files.endsWith(".js"));
          
          for (const file of commands) {
            const getFileName = require(`./commands/${dirs}/${file}`);
            client1.commands.set(getFileName.name, getFileName);
          }
        })
          
        readdirSync("./events/").forEach(dirs => {
          const events = readdirSync(`./events/${dirs}/`).filter(files => files.endsWith(".js"));
          
          for (const event of events) {
            const evt = require(`./events/${dirs}/${event}`);
            if (evt.once){
              client1.once(evt.name, (...args) => evt.run(...args, client1));
            }
            else{
              client1.on(evt.name, (...args) => evt.run(...args, client1));
            }
          }
        })
      })
  }
  else if (interaction.customId === "refuse") {
    const accept = new Discord.ButtonBuilder()
    .setCustomId(`accept/`)
    .setStyle(Discord.ButtonStyle.Success)
    .setLabel("Connecter")
    .setDisabled(true)
    
    const refuser = new Discord.ButtonBuilder()
    .setCustomId(`refuse`)
    .setStyle(Discord.ButtonStyle.Danger)
    .setLabel("Refuser")
    .setDisabled(true)

    const row = new Discord.ActionRowBuilder()
    .addComponents(accept).addComponents(refuser)

    interaction.update({components: [row]})
  } 
})



// ANTI CRASH
process.on("unhandledRejection", (reason, p) => {
  if (reason.code === 0) return; // 404: Not Found
  if (reason.code === 400) return; // Invalid Token
  if (reason.code == 10062) return; // Unknown interaction
  if (reason.code == 10008) return; // Unknown message
  if (reason.code === 50035) return; // Invalid Form Body
  if (reason.code === 40032) return; // Not Connected At Voice 
  if (reason.code ==  50013) return; // Missing permissions
  if (reason.message.includes("GUILD_VOICE")) return; //CACHE LE MESSAGE INUTILE "GUILD_VOICE"
  if (reason.message.includes("Temp env not set")) return; // Bug Stream
  if (reason.message.includes('no such file or director')) return; // Bug Stream
  if (reason.message.includes("getaddrinfo ENOTFOUND null")) return; // Bug Vocale
    console.log(reason, p);
});
process.on("uncaughtException", (err, origin) => {
    console.log(err, origin);
});
process.on("multipleResolves", (type, promise, reason) => {
    //console.log(type, promise, reason);
})
