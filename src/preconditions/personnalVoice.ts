import { Precondition } from 'amethystjs';
import { GuildMember } from 'discord.js';

export default new Precondition('personnalVoice').setChatInputRun(({ interaction }) => {
    const returnDefault = () => {
        return {
            ok: false,
            isChatInput: true,
            interaction,
            metadata: {
                silent: true
            }
        };
    };

    const voice = (interaction.member as GuildMember).voice;
    if (!voice || !voice.channel) {
        interaction
            .reply({
                content: `:x: Vous n'êtes pas connecté dans un salon personnel pour faire cette commande`,
                ephemeral: true
            })
            .catch(() => {});
        return returnDefault();
    }
    if (!interaction.client.voiceChannels.isUserOwned(interaction.user.id, voice.channelId)) {
        interaction
            .reply({
                content: `:x: Vous n'êtes pas le propriétaire du salon pour faire cette commande`,
                ephemeral: true
            })
            .catch(() => {});
        return returnDefault();
    }

    return {
        ok: true,
        isChatInput: true,
        interaction
    };
});
