import { createConnection } from 'mysql';
import { DefaultQueryResult, QueryResult, Tables } from '../typings/types';

export const database = createConnection({
    host: process.env.db_host,
    user: process.env.db_user,
    password: process.env.db_pwd,
    database: process.env.db
});

database.connect((error) => {
    if (error) {
        throw error;
    }
});

export const query = <T = DefaultQueryResult>(query: string): Promise<QueryResult<T>> => {
    return new Promise((resolve, reject) => {
        database.query(query, (error, request) => {
            if (error) return reject(error);
            resolve(request);
        });
    });
};
export const checkDatabase = async () => {
    await query(
        `CREATE TABLE IF NOT EXISTS tickets (guild_id VARCHAR(255) NOT NULL, channel_id VARCHAR(255) NOT NULL, user_id VARCHAR(255) NOT NULL, subject VARCHAR(255) NOT NULL, state VARCHAR(6) NOT NULL DEFAULT 'open', id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT)`
    );
    await query(`CREATE TABLE IF NOT EXISTS ${Tables.Owners} (user_id VARCHAR(255) PRIMARY KEY)`);
    await query(`CREATE TABLE IF NOT EXISTS ${Tables.VoiceChannels} (
        channel_id VARCHAR(255) NOT NULL PRIMARY KEY,
        owner_id VARCHAR(255) NOT NULL
    )`);
    await query(`CREATE TABLE IF NOT EXISTS levels (
        guild_id VARCHAR(255) NOT NULL,
        user_id VARCHAR(255) NOT NULL,
        messages INTEGER(255) NOT NULL DEFAULT '0',
        total INTEGER(255) NOT NULL DEFAULT '0',
        level INTEGER(255) NOT NULL DEFAULT '0',
        objectif INTEGER(255) NOT NULL DEFAULT '100')`);

    await query(
        `CREATE TABLE IF NOT EXISTS ${Tables.birthdays} ( user_id VARCHAR(255) NOT NULL PRIMARY KEY, day VARCHAR(2) NOT NULL DEFAULT '00', month VARCHAR(2) NOT NULL DEFAULT '00', year VARCHAR(4) NOT NULL DEFAULT '----' )`
    );
    return 'done';
};
