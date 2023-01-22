import { Collection, If } from 'discord.js';

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
    Owners = 'bot_owners',
    VoiceChannels = 'voice_channels',
    birthdays = 'birthdays'
}
export type PersonnalVoice = {
    owner_id: string;
    channel_id: string;
};
export type birthday<Raw extends boolean = true> = {
    user_id: string;
    /**
     * Day like 02, 08 or 15
     */
    day: string;
    /**
     * Month like 01, 06 or 12
     */
    month: string;
    /**
     * Year like 2007 or ----
     */
    year: string;
    /**
     * MySQL boolean value
     */
    wished: If<Raw, true, false>;
};
export type partnerSubCommandOpt = 'help' | 'ajouter' | 'retirer' | 'liste';
export type levelSubcommandOpt = 'help' | 'ajouter';
export type ElementType<T extends unknown[]> = T extends Array<infer U> ? U : never;

export type level = {
    guild_id: string;
    user_id: string;
    messages: number;
    level: number;
    total: number;
    objectif: number;
};
export type CacheType = Collection<string, Collection<string, level>>;
export enum ComponentIds {
    TicketRecrutes = 'tickets-recrutement',
    TicketProblem = 'tickets-probleme',
    TicketTrade = 'tickets-échanges',
    TicketOther = 'ticket-other',
    TicketPanel = 'ticket-panel',
    TicketClose = 'closeticket',
    TicketReopen = 'reopenticket',
    TicketDelete = 'ticketdelete'
}
