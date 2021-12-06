import crypto from 'crypto';

export function encrypt(str: string): string {
    const hash = crypto.createHash('sha256');
    hash.update(str);
    return hash.digest('hex');
}
export function decrypt(str: string): string {
    const hash = crypto.createHash('sha256');
    hash.update(str);
    return hash.digest('hex');
}
