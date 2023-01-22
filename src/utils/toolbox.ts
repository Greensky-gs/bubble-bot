import { ActionRowBuilder, AnyComponentBuilder, ButtonBuilder, ButtonStyle, EmojiResolvable } from 'discord.js';
import { ComponentIds } from '../typings/types';

export const numerize = (int: number) => int.toLocaleString('fr');
export const resize = (str: string, length?: number) => {
    const max = length ?? 200;

    if (str.length <= max) return str;

    return `${str.substring(0, max - 2)}...`;
};
export const random = ({ min = 0, max = 100 }: { max?: number; min?: number }) => {
    return Math.floor(Math.random() * max - min) + min;
};
export const row = <T extends AnyComponentBuilder = ButtonBuilder>(...components: T[]): ActionRowBuilder<T> => {
    return new ActionRowBuilder().setComponents(components) as ActionRowBuilder<T>;
};
export const button = ({
    label,
    url,
    emoji,
    componentId,
    id,
    style
}: {
    style: keyof typeof ButtonStyle;
    label?: string;
    emoji?: EmojiResolvable;
    id?: string;
    componentId?: keyof typeof ComponentIds;
    url?: string;
}) => {
    const data = {
        style: ButtonStyle[style]
    } as any;
    if (id) data.custom_id = id;
    if (componentId) data.custom_id = ComponentIds[componentId];
    if (url) data.url = url;
    if (label) data.label = label;
    if (emoji) data.emoji = emoji;

    return new ButtonBuilder(data);
};
