/*
const { language } = require('../../fonctions')

module.exports = {
    name: "snipeurl",
    description: "Snipe one url",
    run: async (client, message, args, db, prefix) => {

        if (args[0] === "-stop"){
            db.speedurl.forEach(interval => clearInterval(interval));
            message.edit(await language(client, "J'arrete de snipe \`METTRE LA FONCTION ICI\`", "I stop snipe \`METTRE LA FONCTION ICI\`"))
        }
        else{
            message.edit(await language(client, "Je commence a snipe \`METTRE LA FONCTION ICI\`", "I'm starting to snipe \`METTRE LA FONCTION ICI\`"))
        }
    }
}
*/