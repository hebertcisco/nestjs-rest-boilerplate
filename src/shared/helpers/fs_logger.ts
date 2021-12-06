import fs = require('fs');
import { date } from 'date-handle';
import { randomString } from './random.int';

export const fs_logger = async (data: any) => {
    const mainPath = __dirname + '/../../../logs';
    if (!fs.existsSync(mainPath)) {
        fs.mkdirSync(mainPath);
    }
    return fs.writeFileSync(
        mainPath + '/log_' + date.nowFully + randomString(4, 'n') + '.log',
        JSON.stringify(data),
    );
};
