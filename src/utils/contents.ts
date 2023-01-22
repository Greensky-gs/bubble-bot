import { EmbedBuilder, GuildMember, User } from 'discord.js';
import { numerize } from './toolbox';
import { level } from '../typings/types';
import config from './config';

export const PartnerEmbed = (user: User) => {
    return new EmbedBuilder()
        .setTitle(`Échange publicitaire`)
        .setDescription(`Merci à <@${user.id}> d'avoir fait un échange avec nous !`)
        .setColor('#2bfafa');
};
export const cancel = () => {
    return new EmbedBuilder().setTitle(':bulb: Annulé').setColor('Yellow');
};
export const AdminsList = (admins: string[]) => {
    return new EmbedBuilder()
        .setTitle('Administrateurs Bubble')
        .setDescription(
            `Il y a ${numerize(admins.length)} administrateur${admins.length > 0 ? 's' : ''} Bubble\n${admins
                .map((x) => `<@${x}>`)
                .join(' ')}`
        )
        .setColor('Yellow');
};
const addFooter = (user: User, embed: EmbedBuilder) => {
    return embed.setFooter({
        text: user.username,
        iconURL: user.displayAvatarURL({ forceStatic: true })
    });
};
export const helpEmbed = (command: string, user: User) => {
    return addFooter(user, new EmbedBuilder().setTitle(`Commande ${command}`).setColor('Yellow'));
};
export const VoiceChannelLimitEdited = (user: User, limit: number) => {
    return addFooter(
        user,
        new EmbedBuilder()

            .setTitle('Limite modifiée')
            .setDescription(`La limite de votre salon a été configurée sur **${numerize(limit)}**`)
            .setColor('#2bfafa')
    );
};
export const levelUp = (level: level) => `・୨<a:B_aBoyLove:1036229515602567219>୧・ <@${
    level.user_id
}> **félicitations, tu as atteint le niveau ${numerize(level.level)} !**・୨<a:B_aRainbowSparkles:1036229393699323914>୧
・୨<:B_RemWink:1036229532576927774>୧・Continues à être actif, tu es un bon exemple !`;
export const welcomeContent = (member: GuildMember) => {
    return {
        content: `<@&${config('welcomer')}> Souhaitez la bienvenue à <@${member.id}>`,
        embeds: [
            new EmbedBuilder()
                .setTitle('Bienvenue !')
                .setDescription(
                    `─────✧ Welcome <@${member.id}> ✧─────
<a:B_aBoyLove:1036229515602567219>⊱ Je t'invite à aller prendre tes rôles : <#1066495051376631820>
<a:B_aAnyaYay:1036229414599544903>⊱ N'hésite pas à te présenter : <#1066495051376631820>
‿︵‿︵ʚMerci d'avoir rejoint !`
                )
                .setImage(
                    'https://images-ext-1.discordapp.net/external/XInuBEQE0ctjKt2IVxhdracJ6OxQrpXrmMuyEMXsenc/https/media.tenor.com/dtGytZeu-TMAAAAC/makoto-anime.gif'
                )
                .setTimestamp()
        ]
    };
};
