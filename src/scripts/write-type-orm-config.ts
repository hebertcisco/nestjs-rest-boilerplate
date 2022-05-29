import fs from 'node:fs';
import { typeormConfig } from 'src/infra/database/typeorm/typeorm.config';

fs.writeFileSync(
    'ormconfig.json',
    JSON.stringify(typeormConfig.getTypeOrmConfig(), null, 2),
);
