import Redis from 'ioredis';
import { REDIS_CONFIG } from './config.redis';

export const redis_pub = new Redis({
    ...REDIS_CONFIG,
});
export const redis_sub = new Redis({
    ...REDIS_CONFIG,
});
redis_sub.on('connect', function () {
    process.stdout.write('Redis client connected!\n');
});
export default {
    redis_pub,
    redis_sub,
};
