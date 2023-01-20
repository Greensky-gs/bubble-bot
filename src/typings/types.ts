export type DefaultQueryResult = {
    fieldCount: number;
    affectedRows: number;
    insertId: number;
    serverStatus: number;
    warningCount: number;
    message: string;
    protocol41: boolean;
    changedRows: number;
};
export type QueryResult<T> = T extends DefaultQueryResult ? DefaultQueryResult : T[];

export type Owner = {
    user_id: string;
};
export enum Tables {
    Owners = 'bot_owners'
}
export type partnerSubCommandOpt = 'help' | 'ajouter' | 'retirer' | 'liste'
export type ElementType<T extends any[]> = T extends Array<infer U> ? U : never;