/**
 * Pseudo-random string generator
 * Default: return a random alpha-numeric string
 *
 * @param {Integer} len Desired length
 * @param {String} an Optional (alphanumeric), "a" (alpha), "n" (numeric)
 * @return {String}
 */
function randomString(len: number, an: string) {
    an = an && an.toLowerCase();
    let str = '';
    let i = 0;
    const min = an == 'a' ? 10 : 0;
    const max = an == 'n' ? 10 : 62;
    for (; i++ < len; ) {
        let r = (Math.random() * (max - min) + min) << 0;
        str += String.fromCharCode((r += r > 9 ? (r < 36 ? 55 : 61) : 48));
    }
    return str;
}
function randomInt(min: number, max: number): number {
    return Number(randomString(max, 'n'));
}
export { randomInt, randomString };
