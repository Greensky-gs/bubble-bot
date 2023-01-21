import { AmethystEvent, commandDeniedCode } from 'amethystjs';

export default new AmethystEvent('commandDenied', (command, reason) => {
    if (reason.code === commandDeniedCode.GuildOnly) {
        if (command.isMessage) {
            command.message.channel
                .send({ content: `:x: Cette commande n'est exécutable qu'en messages privés` })
                .catch(() => {});
        } else {
            command.interaction
                .reply({
                    content: `:x: Cette commande n'est exécutable qu'en messsages`,
                    ephemeral: true
                })
                .catch(() => {});
        }
    }
});
