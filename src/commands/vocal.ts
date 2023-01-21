import { AmethystCommand, preconditions } from 'amethystjs';
import { ApplicationCommandOptionType, GuildMember } from 'discord.js';
import personnalVoice from '../preconditions/personnalVoice';
import { VoiceChannelLimitEdited } from '../utils/contents';

export default new AmethystCommand({
    name: 'vocal',
    description: 'Gère votre salon vocal personnel',
    options: [
        {
            name: 'limite',
            description: "Modifie la limite d'utilisateurs dans votre salon",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'limite',
                    description: "Limite d'utilisateurs",
                    required: true,
                    type: ApplicationCommandOptionType.Integer,
                    minValue: 1,
                    maxValue: 99
                }
            ]
        }
    ],
    preconditions: [preconditions.GuildOnly, personnalVoice]
}).setChatInputRun(async ({ interaction, options }) => {
    const limit = options.getInteger('limite');
    interaction.client.voiceChannels.editUserLimit((interaction.member as GuildMember).voice.channelId, limit);

    interaction
        .reply({
            embeds: [VoiceChannelLimitEdited(interaction.user, limit)],
            ephemeral: true
        })
        .catch(() => {});
});
