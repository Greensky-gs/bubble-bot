import { AmethystEvent } from 'amethystjs';
import config from '../utils/config';
import { welcomeContent } from '../utils/contents';
import { TextChannel } from 'discord.js';

export default new AmethystEvent('guildMemberAdd', (member) => {
    if (!member.user.bot) {
        const channel = member.guild.channels.cache.get(config('joinChannel')) as TextChannel;

        if (channel) channel.send(welcomeContent(member)).catch(() => {});
    }
});
