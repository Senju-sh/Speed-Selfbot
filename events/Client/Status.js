const fs = require('fs')

module.exports = {
    name: "ready",
    once: false,
  
    run: async (client) => {
        if (!fs.existsSync(`./db/${client.user.id}.json`)) return
        const db = require(`../../db/${client.user.id}.json`)
        if (db.status) client.user.setStatus(db.status)
    }
}