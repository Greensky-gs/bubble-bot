import { Client, Collection } from 'discord.js';
import { birthday } from '../typings/types';
import { query } from '../utils/database';

export class BirthdayManager {
    private cache: Collection<string, birthday<false>> = new Collection();
    private client: Client;

    constructor(client: Client) {
        this.client = client;

        this.start();
    }

    private start() {}
    private async fillCache() {
        const datas = await query<birthday>(``);
    }
}
