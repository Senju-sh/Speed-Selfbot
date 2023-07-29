const { WebhookClient, MessageEmbed } = require('sd-v13.js')
const fs = require('fs')

module.exports = {
    name: "messageDelete",
    once: false,
    run: async (message, client) => {
        try{
            if (message.channel.type !== "DM" && "GROUP_DM") return
            if (message.author.id === client.user.id) return
            
            if (!fs.existsSync(`./db/${client.user.id}.json`)) return fs.writeFileSync(`./db/${client.user.id}.json`, fs.readFileSync("./db/exemple"))
            const db = require(`../../db/${client.user.id}.json`)

            const webhookClient = new WebhookClient({ url: db.webhooklogs });

            const embed = new MessageEmbed()
            .setAuthor({name: `${message.author.tag}`, iconURL: `${message.author.displayAvatarURL({dynamic: true})}`})
            .setColor("#00ffb1")
            .setTitle("<a:diamond:1092005540248440952>・Message Supprimé・<a:diamond:1092005540248440952>")
            .addFields({name: "Message : ", value: `${message.content}`})
            .addFields({name : "Salon : ", value: `<#${message.channel.id}>`})
            .setTimestamp()
            .setFooter({text: `${client.user.username}・SPEED`, iconURL: `${client.user.displayAvatarURL({dynamic: true})}`})

            setTimeout(() => {
                webhookClient.send({ embeds: [embed], username: `${client.user.username} | SPEED`, avatarURL: `https://i.imgur.com/dqKTjPC.png` });
            }, 3000);
        }
        catch{}
    }
}