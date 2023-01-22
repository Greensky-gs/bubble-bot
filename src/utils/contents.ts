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
export const ticketPanel = () => {
    return new EmbedBuilder()
        .setAuthor({
            name: 'Vous voulez contacter le staff ?',
            iconURL: 'attachment://mail.png'
        })
        .setDescription(
            `Via le **menu déroulant** ci-dessous, **choisissez** ce qui vous convient le **mieux**.\n\nSoyez \`clair\`, \`gentil\` et \`agréable\` lors de **votre demande**\nN'hésitez pas à \`préciser\` **votre demande** en envoyant des \`fichiers\`, des \`liens\`...\n\n<:8581_KannaHello:1048696892176998493> Le __**support**__ est de \`7:00\` à \`21:00\`\n\`Les heures hors délai doivent être respectées, merci de ne pas mentionner un utilisateur pendant ces heures\``
        );
};
export const ticketMessage = (user: User, sujbect: string) => {
    return new EmbedBuilder()
        .setTitle(sujbect)
        .setDescription(
            `<@${user.id}> Voici votre ticket\nLe staff vous répondra sous peu\n\n:warning: Merci de ne mentionner personne entre les heures de disponibilité de l'équipe`
        )
        .setColor('Yellow');
};
export const ticketClosed = (userId: string, user: User) => {
    return new EmbedBuilder()
        .setTitle('Fermeture de ticket')
        .setDescription(`Le ticket de <@${userId}> a été fermé par <@${user.id}>`)
        .setColor('#ff0000');
};
export const ticketReopened = (userId: string, user: User) => {
    return new EmbedBuilder()
        .setTitle('Réouverture de ticket')
        .setDescription(`Le ticket de <@${userId}> a été réouvert par <@${user.id}>`)
        .setColor('#00ff00');
};
export const ticketDeletion = (userId: string, user: User) => {
    return new EmbedBuilder()
        .setTitle('Suppression de ticket')
        .setDescription(`Le ticket de <@${userId}> va être supprimé par <@${user.id}> dans quelques secondes`)
        .setColor('#ff0000');
};
