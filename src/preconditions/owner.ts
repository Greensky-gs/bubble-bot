import { Precondition } from 'amethystjs';

export default new Precondition('owner')
    .setChatInputRun(({ interaction }) => {
        if (!interaction.client.owners.isOwner(interaction.user.id)) {
            interaction
                .reply({
                    content: `:x: Vous ne pouvez pas utiliser cette commande`,
                    ephemeral: true
                })
                .catch(() => {});
            return {
                ok: false,
                isChatInput: true,
                interaction,
                metadata: {
                    silent: true
                }
            };
        }
        return {
            ok: true,
            isChatInput: true,
            interaction
        };
    })
    .setMessageRun(({ message }) => {
        if (!message.client.owners.isOwner(message.author.id)) {
            return {
                ok: false,
                isChatInput: false,
                channelMessage: message
            };
        }
        return {
            ok: true,
            isChatInput: false,
            channelMessage: message
        };
    });
