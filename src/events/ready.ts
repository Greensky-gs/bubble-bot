import { AmethystEvent } from "amethystjs";
import { CoinsManager } from "coins-manager";
import { TicketsManager } from "discordjs-tickets";
import { database } from "../utils/query";
import { ActivityType } from "discord.js";

export default new AmethystEvent('ready', (client)  => {
    client.tickets = new TicketsManager(client, database);
    client.coins = new CoinsManager(database)

    client.tickets.start();
    client.coins.start();

    client.user.setActivity({
        name: `Bubble`,
        type: ActivityType.Watching
    })
    client.user.setStatus('idle');
})

declare module 'discord.js' {
    interface Client {
        tickets: TicketsManager;
        coins: CoinsManager<'global'>;
    }
}