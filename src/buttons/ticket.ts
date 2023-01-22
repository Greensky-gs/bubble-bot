import { ButtonHandler } from 'amethystjs';
import { ComponentIds } from '../typings/types';
import { row, button as Button } from '../utils/toolbox';
import { ticketClosed, ticketDeletion, ticketReopened } from '../utils/contents';
import { ActionRowBuilder, ButtonBuilder, TextChannel } from 'discord.js';

export default new ButtonHandler({
    customId: ComponentIds.TicketClose,
    identifiers: [ComponentIds.TicketDelete, ComponentIds.TicketReopen]
}).setRun(async ({ button, message, user }) => {
    const ticket = message.client.tickets.getTicket(message.channel.id);
    if (!ticket) return;

    if (button.customId === ComponentIds.TicketClose) {
        message
            .edit({
                components: [
                    row(
                        Button({
                            label: 'Réouvrir',
                            style: 'Success',
                            componentId: 'TicketReopen'
                        }),
                        Button({
                            label: 'Supprimer',
                            style: 'Danger',
                            componentId: 'TicketDelete'
                        })
                    )
                ]
            })
            .catch(() => {});
        message.client.tickets
            .closeTicket({
                guild: message.guild,
                ticket_id: ticket.id.toString()
            })
            .catch(() => {});
        button
            .reply({
                content: `🔐 Ticket fermé`,
                embeds: [ticketClosed(ticket.user_id, user)]
            })
            .catch(console.log);
    }
    if (button.customId === ComponentIds.TicketReopen) {
        message
            .edit({
                components: [
                    row(
                        Button({
                            label: 'Fermer',
                            style: 'Success',
                            componentId: 'TicketClose'
                        }),
                        Button({
                            label: 'Supprimer',
                            style: 'Danger',
                            componentId: 'TicketDelete'
                        })
                    )
                ]
            })
            .catch(() => {});
        message.client.tickets
            .reopenTicket({
                guild: message.guild,
                ticket_id: ticket.id.toString()
            })
            .catch(() => {});

        button
            .reply({
                content: `🔓 Ticket réouvert`,
                embeds: [ticketReopened(ticket.user_id, user)]
            })
            .catch(() => {});
    }
    if (button.customId === ComponentIds.TicketDelete) {
        message
            .edit({
                components: message.components.map((x) =>
                    new ActionRowBuilder().setComponents(
                        x.components.map((y) => new ButtonBuilder(y.toJSON()).setDisabled(true))
                    )
                ) as ActionRowBuilder<ButtonBuilder>[]
            })
            .catch(() => {});
        button
            .reply({
                content: '🚫 Suppression de ticket',
                embeds: [ticketDeletion(ticket.user_id, user)]
            })
            .catch(() => {});
        setTimeout(() => {
            message.client.tickets.deleteTicket({
                user,
                channel: message.channel as TextChannel
            });
        }, 5000);
    }
});
