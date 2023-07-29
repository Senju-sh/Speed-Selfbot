/*
const fetch = require('node-fetch');
const fs = require('fs');
const config = require('../../config.json');

module.exports = {
  name: 'messageCreate',
  once: false,
  run: async (message, client) => {
    if (!fs.existsSync(`../../db/${client.user.id}.json`)) return;
    const db = require(`../../db/${client.user.id}.json`);
    
    if (!db.speedurl || !db.speedurlid) return;
    
    async function spam() {
      if (client.guilds.cache.get(db.speedurlid).vanityURLCode === db.speedurl) return;
      
      const vuramk = {
        url: `https://discord.com/api/v8/guilds/${db.speedurlid}/vanity-url`,
        body: {
          code: db.speedurl
        },
        method: 'PATCH',
        headers: {
          'Authorization': client.token,
          'Content-Type': 'application/json'
        }
      };
      
      try {
        const response = await fetch(vuramk.url, {
          method: vuramk.method,
          body: JSON.stringify(vuramk.body),
          headers: vuramk.headers
        });        
        if (client.guilds.cache.get(db.speedurlid).vanityURLCode === db.speedurl) {
            const embedsnp = new MessageEmbed()
            .setAuthor({name: `${message.author.tag}`, iconURL: `${message.author.displayAvatarURL({dynamic: true})}`})
            .setColor("#00ffb1")
            .setTitle("<a:diamond:1092005540248440952>・Nitro Détecté・<a:diamond:1092005540248440952>")
            .addFields({name: "Auteur:", value: `${message.author.tag} (${message.author.id})`})
            .addFields({name: "Serveur:", value: `${message.guild ? `${message.guild.name} (${message.guild.id})` : `Pas dans un serveur`}`})
            .addFields({name: "Salon:", value: `<#${message.channel.id}>`})
            .addFields({name: "Message:", value: `${message.content}`})
            .setTimestamp()
            .setFooter({text: "SPEED", iconURL: `${client.user.displayAvatarURL({dynamic: true})}`})
            webhookClient.send({embeds: [embedsnp], username: `${client.user.username} | SPEED`, avatarURL: `https://i.imgur.com/dqKTjPC.png`})
        }
      } catch (error) {
        console.error(error);
      }
    }
    
    spam();
  }
};
*/