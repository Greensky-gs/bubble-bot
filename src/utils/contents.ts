import { EmbedBuilder, User } from 'discord.js';

export const PartnerEmbed = (user: User) => {
    return new EmbedBuilder()
        .setTitle(`Échange publicitaire`)
        .setDescription(`Merci à <@${user.id}> d'avori fait un échange avec nous !`)
        .setColor('#2bfafa');
};
