import { BaseChannel, ChannelType, Client, Collection, VoiceChannel } from 'discord.js';
import config from '../utils/config';
import { PersonnalVoice, Tables } from '../typings/types';
import { query } from '../utils/database';
import { resize } from '../utils/toolbox';
import { DebugImportance } from 'amethystjs';

export class VoiceManager {
    private _channel: VoiceChannel;
    private _client: Client;
    private _cache: Collection<string, PersonnalVoice> = new Collection();

    constructor(client: Client) {
        this._client = client;

        this.start();
    }

    public get client() {
        return this._client;
    }
    public get cache() {
        return this._cache;
    }
    public get channel() {
        return this._channel;
    }

    private async start() {
        await Promise.all([this.fetchChannel(), this.fillCache()]);
        this.setEvent();
    }
    private setEvent() {
        this._client.on('voiceStateUpdate', async (before, after) => {
            if (
                (!before.channel || !this.isChannel(before.channel)) &&
                after.channel &&
                this.isChannel(after.channel)
            ) {
                const channel = await after.channel.guild.channels
                    .create({
                        name: `🫧﹒ ${resize(after.member.user.username, 16)}`,
                        userLimit: 2,
                        parent: after.channel.parent,
                        type: ChannelType.GuildVoice
                    })
                    .catch(() => {});
                if (!channel) return console.log(`${DebugImportance.Critical} Un salon personnel n'a pas pu être crée`);
                await after.setChannel(channel).catch(() => {});

                this._cache.set(after.member.id, {
                    owner_id: after.member.id,
                    channel_id: channel.id
                });

                query(
                    `INSERT INTO ${Tables.VoiceChannels} ( channel_id, owner_id ) VALUES ('${channel.id}', '${after.member.id}')`
                );
            }
            if (
                before.channel &&
                (!after?.channel || before.channel.id !== after.channel.id) &&
                this.isUserOwned(after.member.id, before.channel.id)
            ) {
                before.channel.delete().catch(() => {});
                this._cache.delete(after.member.id);
                query(`DELETE FROM ${Tables.VoiceChannels} WHERE owner_id='${after.member.id}'`);
            }
        });
    }

    public isUserOwned(user: string, channel: string) {
        const userData = this._cache.get(user);
        if (!userData) return false;

        return userData.channel_id === channel;
    }
    /**
     * @param limit Integer greatest than 1
     */
    public editUserLimit(channelId: string, limit: number) {
        const channel = this._channel.guild.channels.cache.get(channelId) as VoiceChannel;

        channel.setUserLimit(limit).catch(() => {});
    }
    private async fetchChannel() {
        const channel = (await this._client.channels.fetch(config('createVoiceChannelId'), {
            allowUnknownGuild: true,
            force: true
        })) as VoiceChannel;

        if (!channel) {
            return console.log(`[!!] Salon vocal non trouvé`);
        }
        this._channel = channel;
        return this._channel;
    }
    private async fillCache() {
        const result = await query<PersonnalVoice>(`SELECT * FROM ${Tables.VoiceChannels}`);

        this._cache.clear();
        result.forEach((x) => {
            this._cache.set(x.owner_id, x);
        });
        return true;
    }
    private isChannel(channel: BaseChannel | string) {
        if (channel instanceof BaseChannel) return channel.id === config('createVoiceChannelId');
        return channel === config('createVoiceChannelId');
    }
}
