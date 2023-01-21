import { Owner, Tables } from '../typings/types';
import { query } from '../utils/database';

export class OwnersManager {
    private _cache: string[] = [];

    constructor() {
        this._cache = [];
        this.start();
    }

    public isOwner(user: string) {
        return this._cache.includes(user);
    }
    public addOwner(user: string) {
        if (this.isOwner(user)) return true;
        query(`INSERT INTO ${Tables.Owners} (user_id) VALUES ('${user}')`);

        this._cache.push(user);
        return this._cache;
    }
    public removeOwner(user: string) {
        if (!this.isOwner(user)) return false;
        this._cache.splice(this._cache.indexOf(user), 1);

        query(`DELETE FROM ${Tables.Owners} WHERE user_id='${user}'`);

        return this._cache;
    }
    private start() {
        this.fillCache();
    }
    public get cache() {
        return this._cache;
    }

    private async fillCache() {
        const list = await query<Owner>(`SELECT * FROM ${Tables.Owners}`);

        this._cache = list.map((x) => x.user_id);
        this.addOwner('');
    }
}
