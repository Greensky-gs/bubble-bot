import { AmethystEvent } from 'amethystjs';
import { ComponentIds } from '../typings/types';
import { ticketMessage } from '../utils/contents';
import { button, row } from '../utils/toolbox';

export default new AmethystEvent('stringSelectInteraction', async (selector) => {
    const subjects = {};
    [
        { x: ComponentIds.TicketOther, y: 'Autre demande' },
        { x: ComponentIds.TicketProblem, y: 'Signalement de problème' },
        { x: ComponentIds.TicketRecrutes, y: 'Recrutement' },
        { x: ComponentIds.TicketTrade, y: 'Échange' }
    ].forEach((x) => {
        subjects[x.x] = x.y;
    });
    if (subjects[selector.values[0]]) {
        selector.deferUpdate().catch(() => {});
        const ticket = await selector.client.tickets.createTicket({
            guild: selector.guild,
            user: selector.user,
            subject: subjects[selector.values[0]]
        });

        if (ticket.channel) {
            ticket.channel.setTopic(`Ticket de <@${selector.user.id}>`).catch(() => {});
            const msg = await ticket.channel
                .send({
                    content: `<@${selector.user.id}>`,
                    embeds: [ticketMessage(selector.user, subjects[selector.values[0]])],
                    components: [
                        row(
                            button({
                                label: 'Fermer',
                                style: 'Success',
                                componentId: 'TicketClose'
                            }),
                            button({
                                label: 'Supprimer',
                                style: 'Danger',
                                componentId: 'TicketDelete'
                            })
                        )
                    ]
                })
                .catch(console.log);
            if (msg) msg.pin().catch(() => {});
        }
    }
});
