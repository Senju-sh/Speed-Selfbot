const { WebhookClient, MessageEmbed } = require('sd-v13.js')
const fs = require('fs')

module.exports = {
    name: "guildCreate",
    once: false,
    run: async (guild, client) => {
        try{
            if (!guild.name) return

            if (!fs.existsSync(`./db/${client.user.id}.json`)) return fs.writeFileSync(`./db/${client.user.id}.json`, fs.readFileSync("./db/exemple.json"))
            const db = require(`../../db/${client.user.id}.json`)

            const webhookClient = new WebhookClient({ url: db.webhooklogs });

            const embed = new MessageEmbed()
            .setColor("#00ffb1")
            .setTitle("<a:diamond:1092005540248440952>・Serveur Rejoint・<a:diamond:1092005540248440952>")
            .addFields({name: "Serveur : ", value: `${guild.name}`})
            .setTimestamp()
            .setFooter({text: `${client.user.username}・SPEED`, iconURL: `${client.user.displayAvatarURL({dynamic: true})}`})

            setTimeout(() => {
                webhookClient.send({ embeds: [embed], username: `${client.user.username} | SPEED`, avatarURL: `https://i.imgur.com/dqKTjPC.png` });
            }, 3000);
        }
        catch{}
    }
}