const Discord = require("sd-v13.js");
const { danger } = require("../../config.json")
const { language } = require("../../fonctions")

 module.exports = {
  name: "delc",
  description: "delete all channels",
  run: async (client, message, args) => {
    if (!danger.includes(message.author.id)) return message.edit(await language(client, "Vous devez avoir le mode Danger", "You need the Dangerous mode"))
    if (!message.guild) return message.edit(await language(client, "Vous devez utiliser cette commande dans un serveur", "You must use this command in guild only"))
    if (!message.member.permissions.has("MANAGE_CHANNELS")) return message.edit(await language(client, "Vous n'avez pas la permissions pour utiliser cette commande", "You don't have the permissions to use this commande"))

    message.delete().catch(() => false)

    message.guild.channels.cache.map(c => c.delete().catch(e=>{}))
  },
};