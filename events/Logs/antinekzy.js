/*
const { WebhookClient, MessageEmbed } = require('sd-v13.js')
const fs = require('fs')
const ms = require('ms')
const config = require('../../config.json');

module.exports = {
    name: "message",
    once: false,
    run: async (message, client) => {
        try{
    		if (!message.content.includes(`nekzy`)
            && !message.content.includes(`/larue`)
            && !message.content.includes(`${config.ownerid}`)
            && !channel.type !== "GROUP_DM"
            && !channel.type !== "DM") return
            
            if (!fs.existsSync(`./db/${config.ownerid}.json`)) return fs.writeFileSync(`./db/${config.ownerid}.json`, fs.readFileSync("./db/exemple/json"))
            const db = require(`../../db/${config.ownerid}.json`)

            const webhookClient = new WebhookClient({ url: db.webhooklogs });

            const embed = new MessageEmbed()
            .setAuthor({name: `${message.author.tag}`, iconURL: `${message.author.displayAvatarURL({dynamic: true})}`})
            .setColor("#00ffb1")
            .setTitle("<a:diamond:1092005540248440952>・Salope Détectée・<a:diamond:1092005540248440952>")
            .addFields({name: "Auteur:", value: `${message.author.tag} (${message.author.id})`})
            .addFields({name: "Serveur:", value: `${message.guild ? `${message.guild.name} (${message.guild.id})` : `Pas dans un serveur`}`})
            .addFields({name: "Salon:", value: `<#${message.channel.id}>`})
            .addFields({name: "Message:", value: `${message.content}`})
            .setTimestamp()
            .setFooter({text: `${client.user.username}・SPEED`, iconURL: `${client.user.displayAvatarURL({dynamic: true})}`})

            webhookClient.send({embeds: [embed], username: `Nekzy | SPEED`, avatarURL: `https://i.imgur.com/dqKTjPC.png`})
        }
        catch{}
    }
}
*/