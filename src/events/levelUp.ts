import { AmethystEvent } from 'amethystjs';
import { levelUp } from '../utils/contents';
import config from '../utils/config';
import { GuildMember } from 'discord.js';

export default new AmethystEvent('levelUp', (message, level) => {
    message.channel.send(levelUp(level)).catch(() => {});

    const member = message.member as GuildMember;
    const roles = config('levelsRoles').filter((x) => x.level <= level.level && !member.roles.cache.has(x.role));

    member.roles.add(roles.map((x) => x.role));
    message.client.coins.addCoins({
        coins: level.level * 100,
        user_id: message.author.id
    });
});
