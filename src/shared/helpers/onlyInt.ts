export const onlyInt = (value: string): number => {
    return Number(value?.replace(/\D+/g, ''));
};
