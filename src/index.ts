import { AmethystClient } from "amethystjs";
import { config } from "dotenv";

config()

export const client = new AmethystClient({
    intents: ['Guilds', 'GuildMembers', 'GuildMessages', 'MessageContent']
}, {
    token: process.env.token,
    commandsFolder: './dist/commands',
    eventsFolder: './dist/events',
    debug: true,
    botName: 'uta',
    botNameWorksAsPrefix: true,
    prefix: 'g!',
    strictPrefix: false,
    waitForDefaultReplies: {
        user: `Vous ne pouvez pas interagir avec ce message`,
        everyone: `Vous ne pouvez pas interagir avec message`
    },
    mentionWorksAsPrefix: true
})

client.start({
    loadCommands: true,
    loadEvents: true
});