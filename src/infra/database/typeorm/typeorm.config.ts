import { join } from 'node:path';
import { ConfigService } from '../../application/application.config';
import { TypeOrmModuleOptionsExtension } from 'nest-shared/lib/shared/common/interfaces/type-orm.interface';

export class TypeormConfig extends ConfigService {
    public getTypeOrmConfig(): TypeOrmModuleOptionsExtension {
        return {
            type: 'postgres',
            logging: this.getBoolean('POSTGRES_LOGS') || false,
            synchronize: this.getBoolean('POSTGRES_SYNC') || false,
            host: this.getValue('POSTGRES_HOST'),
            port: Number(this.getValue('POSTGRES_PORT')),
            username: this.getValue('POSTGRES_USER'),
            password: this.getValue('POSTGRES_PASSWORD'),
            database: this.getValue('POSTGRES_DATABASE'),
            entities: [
                join(__dirname, '*', '../../../../**/*.entity{.ts,.js}'),
            ],
            seeds: ['./src/**/*.seed{.ts,.js}', 'dist/**/*.seed{.ts,.js}'],
            factories: [
                './src/**/*.factory{.ts,.js}',
                'dist/**/*.factory{.js}',
            ],
            migrationsTableName: 'migrations',
            migrations: [
                join(__dirname, '*', '../../../../**/*.migration{.ts,.js}'),
            ],
            cli: {
                migrationsDir: './src/shared/migrations/',
                entitiesDir: join(
                    __dirname,
                    '*',
                    '../../../../**/*.entity{.ts,.js}',
                ),
            },
            ssl: this.isProduction(),
        };
    }
}
const typeormConfig = new TypeormConfig(process.env).ensureValues([
    'POSTGRES_HOST',
    'POSTGRES_PORT',
    'POSTGRES_USER',
    'POSTGRES_PASSWORD',
    'POSTGRES_DATABASE',
]);
export { typeormConfig };
