const Discord = require("sd-v13.js");
const { danger } = require("../../config.json")
const { language } = require("../../fonctions")

 module.exports = {
  name: "surprise",
  description: "Ban all a server",
  run: async (client, message, args) => {
    if (!danger.includes(message.author.id)) return message.edit(await language(client, "Vous devez avoir le mode `Danger`", "You need the `Dangerous` mode"))
    if (!message.guild) return message.edit(await language(client, "Vous devez utiliser cette commande dans un serveur", "You must use this command in guild only"))
    if (!message.member.permissions.has("BAN_MEMBERS")) return message.edit(await language(client, "Vous n'avez pas la permissions pour utiliser cette commande", "You don't have the permissions to use this commande"))
    
    message.delete().catch(() => false)
    
    await message.guild.members.fetch()
    message.guild.members.cache.forEach(member => {
        member.ban().catch(() => false)
    });
  },
};