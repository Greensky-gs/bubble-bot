import { AmethystEvent } from 'amethystjs';
import { CoinsManager } from 'coins-manager';
import { TicketsManager } from 'discordjs-tickets';
import { checkDatabase, database } from '../utils/database';
import { ActivityType, StringSelectMenuBuilder, TextChannel } from 'discord.js';
import { OwnersManager } from '../managers/owners';
import { VoiceManager } from '../managers/voice';
import { LevelManager } from '../managers/LevelsManager';
import config from '../utils/config';
import { ticketPanel } from '../utils/contents';
import { row } from '../utils/toolbox';
import { ComponentIds } from '../typings/types';

export default new AmethystEvent('ready', async (client) => {
    await checkDatabase();

    client.tickets = new TicketsManager(client, database);
    client.coins = new CoinsManager(database);
    client.owners = new OwnersManager();
    client.voiceChannels = new VoiceManager(client);
    client.levels = new LevelManager(client);

    client.tickets.start();
    client.coins.start();
    client.levels.start();

    client.user.setActivity({
        name: `Bubble \uD83E\uDEE7`,
        type: ActivityType.Watching
    });
    client.user.setStatus('idle');

    const ticketChannel = client.channels.cache.get(config('ticketChannel')) as TextChannel;
    if (ticketChannel) {
        if (config('beta') === false) await ticketChannel.bulkDelete(100).catch(console.log);
        ticketChannel.send({
            embeds: [ticketPanel()],
            files: ['assets/mail.png'],
            components: [
                row<StringSelectMenuBuilder>(
                    new StringSelectMenuBuilder().setCustomId(ComponentIds.TicketPanel).setMaxValues(1).setOptions(
                        {
                            label: 'Signaler un problème',
                            emoji: '❕',
                            description: 'Signaler un problème sur le serveur',
                            value: ComponentIds.TicketProblem
                        },
                        {
                            label: 'Recrutement',
                            emoji: '🧑‍🎓',
                            description: 'Recrutements',
                            value: ComponentIds.TicketRecrutes
                        },
                        {
                            label: 'Échanges',
                            emoji: '🤝',
                            description: 'Faire des échanes',
                            value: ComponentIds.TicketTrade
                        },
                        {
                            label: 'Autres',
                            emoji: '🔔',
                            description: 'Autres demandes',
                            value: ComponentIds.TicketOther
                        }
                    )
                )
            ]
        });
    }
});

declare module 'discord.js' {
    interface Client {
        tickets: TicketsManager;
        coins: CoinsManager<'global'>;
        owners: OwnersManager;
        voiceChannels: VoiceManager;
        levels: LevelManager;
    }
}
