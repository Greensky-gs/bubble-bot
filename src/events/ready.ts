import { AmethystEvent } from 'amethystjs';
import { CoinsManager } from 'coins-manager';
import { TicketsManager } from 'discordjs-tickets';
import { checkDatabase, database } from '../utils/database';
import { ActivityType } from 'discord.js';
import { OwnersManager } from '../managers/owners';

export default new AmethystEvent('ready', async (client) => {
    await checkDatabase();

    client.tickets = new TicketsManager(client, database);
    client.coins = new CoinsManager(database);
    client.owners = new OwnersManager();

    client.tickets.start();
    client.coins.start();

    client.user.setActivity({
        name: `Bubble`,
        type: ActivityType.Watching
    });
    client.user.setStatus('idle');
});

declare module 'discord.js' {
    interface Client {
        tickets: TicketsManager;
        coins: CoinsManager<'global'>;
        owners: OwnersManager;
    }
}
