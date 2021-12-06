import pg, { Client } from 'pg';

const Pool = pg.Pool;

const PoolPG = (params) => {
    return new Pool({
        user: params.user,
        host: params.host,
        database: params.database,
        password: params.password,
        port: params.port,
    });
};
export { PoolPG };
export default Client;
