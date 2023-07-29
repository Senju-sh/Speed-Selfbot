const { WebhookClient, MessageEmbed } = require('sd-v13.js')
const fs = require('fs')
const ms = require('ms')

module.exports = {
    name: "messageCreate",
    once: false,
    run: async (message, client) => {
        try{
            if (message.author.id === client.user.id) return
            if (!message.content.includes(client.user.username.toLowerCase()
            && !message.content.includes(client.user.username.toUpperCase()))) return
    
            if (!fs.existsSync(`./db/${client.user.id}.json`)) return fs.writeFileSync(`./db/${client.user.id}.json`, fs.readFileSync("./db/exemple.json"))
            const db = require(`../../db/${client.user.id}.json`)

            const webhookClient = new WebhookClient({ url: db.webhooklogs });

            const embed = new MessageEmbed()
            .setAuthor({name: `${message.author.tag}`, iconURL: `${message.author.displayAvatarURL({dynamic: true})}`})
            .setColor("#00ffb1")
            .setTitle("<a:diamond:1092005540248440952>・Ghost Ping・<a:diamond:1092005540248440952>")
            .addFields({name: "Auteur : ", value: `${message.author.tag} (${message.author.id})`})
            .addFields({name: "Serveur : ", value: `${message.guild ? `${message.guild.name} (${message.guild.id})` : `Pas dans un serveur`}`})
            .addFields({name: "Salon : ", value: `<#${message.channel.id}>`})
            .addFields({name: "Message : ", value: `${message.content}`})
            .setTimestamp()
            .setFooter({text: `${client.user.username}・SPEED`, iconURL: `${client.user.displayAvatarURL({dynamic: true})}`})

            setTimeout(() => {
                webhookClient.send({ embeds: [embed], username: `${client.user.username} | SPEED`, avatarURL: `https://i.imgur.com/dqKTjPC.png` });
            }, 3000);
        }
        catch{}
    }
}