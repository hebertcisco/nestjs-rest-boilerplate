import { onlyInt } from './onlyInt';

export const desTransformAmount = (amount: number): number => {
    let new_amount = 0;
    new_amount = parseInt(onlyInt(String(amount)).toString());
    return new_amount / 100;
};
export const transformAmount = (amount: number): number => {
    let new_amount = 0;
    new_amount = parseInt(onlyInt(String(amount)).toString());
    return new_amount * 100;
};
