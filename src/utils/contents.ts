import { EmbedBuilder, User } from 'discord.js';
import { numerize } from './toolbox';

export const PartnerEmbed = (user: User) => {
    return new EmbedBuilder()
        .setTitle(`Échange publicitaire`)
        .setDescription(`Merci à <@${user.id}> d'avori fait un échange avec nous !`)
        .setColor('#2bfafa');
};
export const cancel = () => {
    return new EmbedBuilder()
        .setTitle(":bulb: Annulé")
        .setColor('Yellow')
}
export const AdminsList = (admins: string[]) => {
    return new EmbedBuilder()
        .setTitle("Administrateurs Bubble")
            .setDescription(`Il y a ${numerize(admins.length)} administrateur${admins.length > 0 ? 's' : ''} Bubble\n${admins.map(x => `<@${x}>`).join(' ')}`)
            .setColor('Yellow')
}
const addFooter = (user: User, embed: EmbedBuilder) => {
    return embed.setFooter({
        text: user.username,
        iconURL: user.displayAvatarURL({ forceStatic: true })
    })
}
export const helpEmbed = (command: string, user: User) => {
    return addFooter(user, new EmbedBuilder()
        .setTitle(`Commande ${command}`)
        .setColor('Yellow')
    )
}