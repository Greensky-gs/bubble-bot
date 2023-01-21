export const numerize = (int: number) => int.toLocaleString('fr');
export const resize = (str: string, length?: number) => {
    const max = length ?? 200;

    if (str.length <= max) return str;

    return `${str.substring(0, max - 2)}...`;
};
