export const numerize = (int: number) => int.toLocaleString('fr');
export const resize = (str: string, length?: number) => {
    const max = length ?? 200;

    if (str.length <= max) return str;

    return `${str.substring(0, max - 2)}...`;
};
export const random = ({ min = 0, max = 100 }: { max?: number; min?: number }) => {
    return Math.floor(Math.random() * max - min) + min;
};
