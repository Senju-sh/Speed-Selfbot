const { danger } = require('../../config.json')
const {  language } = require("../../fonctions")

module.exports = {
    name: "dmfriends",
    description: "Send a message to all your friends",
    run: async (client, message, args, db, prefix) => {
        if (!danger.includes(message.author.id)) return message.edit(await language(client, "Vous devez avoir le mode `Danger`", "You need the `Dangerous` mode"))
        if (!args[0]) return message.edit(`Veuillez entrer un message à envoyer`,`Please enter a message to send at your friends`)
        message.edit("> **SPEED**")
        message.delete().catch(() => false)
        try{
            client.relationships.friendCache.map((friend) => friend ? friend.send(args.slice(0).join(' ')) : "")
        }
        catch(e){}
    }
}