export const REDIS_CACHE_TTL =
    Number(process.env.REDIS_CACHE_TTL) || 60 * 60 * 24; // 1 day

export const REDIS_CONFIG = {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD,
};

export const REDIS_CACHE_OPTIONS = {
    ...REDIS_CONFIG,
    ttl: REDIS_CACHE_TTL,
    //max: 100,
    isGlobal: true,
};

export const REDIS_URL = `redis://${REDIS_CONFIG.password}@${REDIS_CONFIG.host}:${REDIS_CONFIG.port}`;
