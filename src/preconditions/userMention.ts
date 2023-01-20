import { Precondition } from 'amethystjs';

export default new Precondition('userMention').setMessageRun(({ message }) => {
    if (message.mentions.users.size === 0) {
        message.channel.send(`Merci de mentionner un utilisateur pour pouvoir faire cette commande`).catch(() => {});
        return {
            ok: false,
            metadata: {
                silent: true
            },
            channelMessage: message,
            isChatInput: false
        };
    }
    return {
        ok: true,
        isChatInput: false,
        channelMessage: message
    };
});
