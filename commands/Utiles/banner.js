const Discord = require("sd-v13.js");
const { language } = require("../../fonctions")

module.exports = {
    name: "banner",
    description: "Get a user's banner",
    run: async (client, message, args) => {
        let user;
        if (args.length > 0) {
            const mention = args[0];
            const userID = mention.replace(/[^0-9]/g, '');

            user = client.users.cache.get(userID);

            if (!user) {
                return message.edit(await language(client, `⛧ **__Speed__** ⛧\n> Utilisateur introuvable. Veuillez spécifier un utilisateur valide.`, `⛧ **__Speed__** ⛧\n> User not found. Please specfy a valid user.`));
            }

        } else {
            user = message.author;
        }

        await user.fetch();

        if (!user.banner) {
            return message.edit(await language(client, `⛧ **__Speed__** ⛧\n> L'utilisateur ${user} ne possède pas de bannière.`, `⛧ **__Speed__** ⛧\n> User ${user} has no banner.`));
        }

        const bannerURL = user.bannerURL({ dynamic: true, format: 'png', size: 1024 });

        message.edit(await language(client, `⛧ **__Speed__** ⛧\n> **Bannière de ${user} :** ${bannerURL}`, `⛧ **__Speed__** ⛧\n> **Banner of ${user} :** ${bannerURL}`));
    }
}