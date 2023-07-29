const fs = require('fs')
require('@nekzy/nekzy.js-stream');

module.exports = {
  name: "ready",
  once: false,
  run: async (client) => {
    try{
      if (!fs.existsSync(`./db/${client.user.id}.json`)) return
      const db = require(`../../db/${client.user.id}.json`)
      
      client.patchVoiceEvents()

      const channel = await client.channels.fetch(db.voiceconnect)
      client.joinVoice(channel.guild.id, channel.id).then(async () => {
        db.voicestream ? await client.createStream() : ""
        db.voicewebcam ? client.signalVideo(channel.guild.id, channel.id, true, db.voicemute, db.voicedeaf) : ""
      })

      
    }
    catch(e){}
  }
}