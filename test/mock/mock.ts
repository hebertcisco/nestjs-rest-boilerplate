import dotenv from 'dotenv';
import * as crypto from 'crypto';

dotenv.config();

export const EMAIL = 'test-jest@gmail.com';
export const USER_ID =
    '563db30e-0503-4077-966a-e0579ac96118' || crypto.randomUUID();
