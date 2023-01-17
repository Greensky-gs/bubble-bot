import { createConnection } from "mysql";
import { DefaultQueryResult, QueryResult } from "../typings/types";

export const database = createConnection({
    host: process.env.db_host,
    user: process.env.db_user,
    password: process.env.db_pwd,
    database: process.env.db
});

database.connect((error) => {
    if (error) {
        throw error
    }
})

export default function <T = DefaultQueryResult>(query: string): Promise<QueryResult<T>> {
    return new Promise((resolve, reject) => {
        database.query(query, (error, request) => {
            if (error) return reject(error)
            resolve(request);
        });
    });
}