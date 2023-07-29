const { WebhookClient, MessageEmbed } = require('sd-v13.js')
const fs = require('fs')

module.exports = {
    name: "messageUpdate",
    once: false,
    run: async (oldMessage, newMessage, client) => {
        try{
            if (oldMessage.channel.type !== "DM" && "GROUP_DM") return
            if (oldMessage.author.id === client.user.id) return
            if (oldMessage.content === newMessage.content) return
    
            if (!fs.existsSync(`./db/${client.user.id}.json`)) return fs.writeFileSync(`./db/${client.user.id}.json`, fs.readFileSync("./db/exemple.json"))
            const db = require(`../../db/${client.user.id}.json`)

            const webhookClient = new WebhookClient({ url: db.webhooklogs });

            const embed = new MessageEmbed()
            .setAuthor({name: `${oldMessage.author.tag}`, iconURL: `${oldMessage.author.displayAvatarURL({dynamic: true})}`})
            .setColor("#00ffb1")
            .setTitle("<a:diamond:1092005540248440952>・Message Modifié・<a:diamond:1092005540248440952>")
            .addFields({name: "Ancien Message : ", value: `\`${oldMessage.content}\``})
            .addFields({name: "Nouveau Message : ", value: `\`${newMessage.content}\``})
            .addFields({name: "Salon : ", value: `<#${message.channel.id}>`})
            .setTimestamp()
            .setFooter({text: `${client.user.username}・SPEED`, iconURL: `${client.user.displayAvatarURL({dynamic: true})}`})

            setTimeout(() => {
                webhookClient.send({ embeds: [embed], username: `${client.user.username} | SPEED`, avatarURL: `https://i.imgur.com/dqKTjPC.png` });
            }, 3000);
        }
        catch{}
    }
}