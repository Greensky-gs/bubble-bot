import { AmethystCommand } from 'amethystjs';
import { helpPage } from '../utils/contents';

export default new AmethystCommand({
    name: 'help',
    description: "Affiche la page d'aide des commandes"
})
    .setChatInputRun(async ({ interaction }) => {
        const commands = interaction.client.chatInputCommands;

        interaction
            .reply({
                embeds: [helpPage(commands, 'slash', interaction.client)]
            })
            .catch(() => {});
    })
    .setMessageRun(({ message }) => {
        if (!message.client.owners.isOwner(message.author.id)) return;

        message
            .reply({
                embeds: [helpPage(message.client.messageCommands, 'prefix', message.client)]
            })
            .catch(() => {});
    });
