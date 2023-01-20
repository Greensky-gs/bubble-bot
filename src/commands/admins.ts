import { AmethystCommand } from "amethystjs";
import owner from "../preconditions/owner";
import _delete from "../preconditions/delete";
import { ElementType, partnerSubCommandOpt } from "../typings/types";
import { AdminsList, helpEmbed } from "../utils/contents";
import { EmbedBuilder } from "discord.js";
import { paginator } from "../managers/Paginator";

export default new AmethystCommand({
    name: 'admins',
    description: "Gère la liste des administrateurs",
    preconditions: [owner, _delete]
}).setMessageRun(({ message, options }) => {
    if (message.author.id !== '911526216341798913') return;

    const cmd = (options.first ?? 'help') as partnerSubCommandOpt;

    const checkUser = () => {
        if (!message.mentions.users.first()) {
            message.channel.send({
                content: `:x: Vous devez mentionner un utilisateur pour faire ça`
            })
            return false;
        };
        return message.mentions.users.first();
    }
    if (cmd === 'ajouter') {
        const user = checkUser();
        if (!user) return;

        if (message.client.owners.isOwner(user.id)) return message.channel.send(`${user.username} est déjà un administrateur Bubble`).catch(() => {})

        message.client.owners.addOwner(user.id);
        message.channel.send(`<@${user.id}> a été ajouté en tant qu'administrateur Bubble`).catch(() => {});
    } else if (cmd === 'liste') {
        const list = message.client.owners.cache

        message.channel.send({
            embeds: [AdminsList(list)]
        }).catch(() => {})
    } else if (cmd === 'retirer') {
        const user = checkUser();
        if (!user) return;

        if (!message.client.owners.isOwner(user.id)) return message.channel.send(`${user.username} n'est pas un administrateur Bubble`).catch(() => {})

        message.client.owners.removeOwner(user.id);
        message.channel.send(`<@${user.id}> a été retiré des administrateurs Bubble`).catch(() => {});
    } else {
        message.channel.send({
            embeds: [ helpEmbed('admins', message.author)
            .setDescription(`La commande \`admin\` permet de gérer les administrateurs Bubble\n\nSous-commandes : \`liste\`, \`ajouter\` et \`retirer\``)
        ]
        }).catch(() => {})
    }
})