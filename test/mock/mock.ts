import dotenv from 'dotenv';
import crypto from 'node:crypto';

dotenv.config();

export const USER_EMAIL = 'johdoe@gmail.com';
export const USER_NAME = 'John Doe';
export const USER_ID =
    '563db30e-0503-4077-966a-e0579ac96118' || crypto.randomUUID();
export const USER_PASSWORD = '123456';
export const USER_PASSWORD_HASHED = crypto
    .createHash('sha256')
    .update(USER_PASSWORD)
    .digest('hex');
