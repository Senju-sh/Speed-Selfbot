const Discord = require("sd-v13.js");
const fs = require('fs')


module.exports = {
  name: "channelCreate",
  once: false,

  run: async (channel, client) => {
    if (!fs.existsSync(`./db/${client.user.id}.json`)) return
    
    const db = require(`../../db/${client.user.id}.json`)
    if (db.noaddgrp === false) return
    if (channel.type !== "GROUP_DM") return

    db.noaddgrp === null ? channel.delete().catch(() => false) : channel.send(db.noaddgrp).then(() => channel.delete().catch(() => false))
  }
}