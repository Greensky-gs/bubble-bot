import { AmethystClient } from 'amethystjs';
import { Partials } from 'discord.js';
import { config } from 'dotenv';

config();

export const client = new AmethystClient(
    {
        intents: ['Guilds', 'GuildMembers', 'GuildMessages', 'MessageContent', 'GuildVoiceStates'],
        partials: [Partials.Channel, Partials.Message]
    },
    {
        token: process.env.token,
        commandsFolder: './dist/commands',
        eventsFolder: './dist/events',
        preconditionsFolder: './dist/preconditions',
        buttonsFolder: './dist/buttons',
        debug: true,
        botName: 'uta',
        botNameWorksAsPrefix: true,
        prefix: '+',
        strictPrefix: false,
        waitForDefaultReplies: {
            user: `Vous ne pouvez pas interagir avec ce message`,
            everyone: `Vous ne pouvez pas interagir avec message`
        },
        mentionWorksAsPrefix: true
    }
);

client.start({
    loadCommands: true,
    loadEvents: true,
    loadPreconditions: true,
    loadButtons: true
});
