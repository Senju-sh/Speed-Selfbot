const { language } = require("../../fonctions")
require('@nekzy/nekzy.js-stream');

module.exports = {
    name: "joinvc",
    description: "Join a voice channel",
    run: async (client, message, args, db, prefix) => {
      let channel = message.mentions.channels.first() || client.channels.cache.get(args[0]) || client.channels.fetch(args[0]).catch(async () => {return message.edit(await language(client, `Aucun salon de trouvé pour \`${args[0] || "rien"}\``, `No channel found for \`${args[0] || "nothing"}\``))})
      if (channel.type !== "GUILD_VOICE" && channel.type !== "DEFAULT" || channel.type === "DM" || channel.type === "GROUP_DM") return message.edit(await language(client, "Veuillez me donner un salon vocale", "Please give me a voice channel"))
      message.edit(await language(client, `**Je me suis connecté dans le salon :** <#${args[0]}>`,`**I join the channel :** <#${args[0]}>`))
      
      client.joinVoice(channel.guild.id, channel.id).then(async () => {
        db.voicestream ? await client.createStream() : ""
        db.voicewebcam ? client.signalVideo(channel.guild.id, channel.id, true, db.voicemute, db.voicedeaf) : ""
      })
  }
}
