const Discord = require("sd-v13.js");
const { joinVoiceChannel } = require('@discordjs/voice');
const {  language, savedb } = require("../../fonctions")
const fs = require('fs')
module.exports = {
  name: "voicesettings",
  description: "Activate / deactivate the sniper nitro",
  run: async (client, message, args, db, prefix) => {
    try{

        if (args[0] === "list"){
            message.edit(await language(client, 
 `⛧ **Speed - Voice** ⛧
 
\`${prefix}voicesettings auto [channel_id]\` ➜ **Défini le nouveau salon vocal qui sera rejoint au démarrage**
\`${prefix}voicesettings webcam <on/off>\` ➜ **Active ou désactive le module webcamen salon vocale
\`${prefix}voicesettings stream <on/off>\` ➜ **Active ou désactive le module stream en salon vocale**
             `               
,`
⛧ **Speed - Voice** ⛧
 
\`${prefix}voicesettings auto [channel_id]\` ➜ **Sets the new voice channel that will be automatically joined on start**
\`${prefix}voicesettings webcam <on/off>\` ➜ **Activates or de-activates webcam in voice module**
\`${prefix}voicesettings stream <on/off>\` ➜ **Activates or de-activates streaming in voice module**
            `))
        }

        if (args[0] === "auto"){
            if (!args[1]){
                db.voiceconnect = null
                savedb(client, db)
                message.edit(await language(client, "Le module vocale a été retiré", "The voice module has been removed"))
            }

            const channel =  message.mentions.channels.first() || client.channels.cache.get(args[1])
            console.log(channel.type)
            if (channel.type !== "GUILD_VOICE" && channel.type !== "DEFAULT" || channel.type === "DM" || channel.type === "GROUP_DM")
            return message.edit(await language(client, "Le salon n'est pas un salon vocale", "The channel is not a voice channel"))

            db.voiceconnect = channel.id
            savedb(client, db)
            return message.edit(await language(client, `Module vocale activé dans <#${channel.id}>`, `Voice module activated to <#${channel.id}>`))

        }

        if (args[0] === "webcam"){
            if (args[1] !== "on" && args[1] !== "off")
            return message.edit(await language(client, "Paramètre manquant: `on/off`", "Missing parrameter: `on/off`"))

            if (args[1] === "on"){
                db.voicewebcam = true
                savedb(client, db)
                message.edit(await language(client, "Le module webcam a été activé", "The webcam module has been activated"))
            }
            else{
                db.voicewebcam = false
                savedb(client, db)
                message.edit(await language(client, "Le module webcam a été désactivé", "The webcam module has been desactivated"))
            }
        }

        if (args[0] === "stream"){
            if (args[1] !== "on" && args[1] !== "off")
            return message.edit(await language(client, "Paramètre manquant: `on/off`", "Missing parrameter: `on/off`"))

            if (args[1] === "on"){
                db.voicestream = true
                savedb(client, db)
                message.edit(await language(client, "Le module streaming a été activé", "The streaming module has been activated"))
            }
            else{
                db.voicestream = false
                savedb(client, db)
                message.edit(await language(client, "Le module streaming a été désactivé", "The streaming module has been desactivated"))
            }

        }

    }
    catch(e){}
}
}