import dotenv from 'dotenv';

dotenv.config();

const CURRENCY_CODE_BRL = 986;
const APP_SECRET: string = process.env.APP_SECRET;

export { CURRENCY_CODE_BRL, APP_SECRET };
