import { AmethystCommand, preconditions } from 'amethystjs';
import owner from '../preconditions/owner';
import _delete from '../preconditions/delete';
import { levelSubcommandOpt } from '../typings/types';
import { numerize, random } from '../utils/toolbox';
import { helpEmbed } from '../utils/contents';

export default new AmethystCommand({
    name: 'level',
    description: 'Affiche les niveaux du serveur',
    preconditions: [preconditions.GuildOnly, owner, _delete]
}).setMessageRun(async ({ message, options }) => {
    const cmd = (options.first ?? 'help') as levelSubcommandOpt;

    if (cmd === 'ajouter') {
        const user = message.mentions.users.first();
        if (!user)
            return message.channel
                .send({ content: `:x: Vous devez mentionner un utilisateur pour faire cette commande` })
                .catch(() => {});

        const levels = parseInt(options.second ?? '');
        if (isNaN(levels) || levels < 1)
            return message.channel
                .send(`:x: Merci de préciser un nombre valide supérieur à 1 après la mention de l'utilisateur`)
                .catch(() => {});

        message.client.levels.addLevels(levels, message.guild.id, user.id);
        message.channel.send(`Ajout de **${numerize(levels)}** niveaux à <@${user.id}>`).catch(() => {});
    } else {
        message.channel.send({
            embeds: [
                helpEmbed('level', message.author)
                    .setDescription(`Permet de gérer les niveaux d'une personnes\n\n**Sous-commandes :** \`ajouter\``)
                    .setFields({
                        name: 'ajouter',
                        value: `\`+level ajouter @utilisateur [niveaux]\`\nAjout des niveaux à un utilisateur\n\n**Exemple :**\n\`+level ajouter @${
                            message.author.username
                        } ${random({ min: 1, max: 10 })}\``
                    })
            ]
        });
    }
});
