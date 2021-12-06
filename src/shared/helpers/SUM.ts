export function SUM(arr: number[]): number {
    return arr.reduce((a, b) => Number(a) + Number(b), 0);
}
