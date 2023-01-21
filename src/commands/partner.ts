import { AmethystCommand } from 'amethystjs';
import owner from '../preconditions/owner';
import _delete from '../preconditions/delete';
import userMention from '../preconditions/userMention';
import { PartnerEmbed } from '../utils/contents';

export default new AmethystCommand({
    name: 'partner',
    description: 'Fait un partenariat',
    preconditions: [owner, _delete, userMention]
}).setMessageRun(({ message }) => {
    message.channel
        .send({
            content: `🔔 \`Notification:\` <@&1037837822540926996>`,
            embeds: [PartnerEmbed(message.mentions.users.first())]
        })
        .catch(() => {});
});
