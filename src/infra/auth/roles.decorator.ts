import { ForbiddenException } from '@nestjs/common';

import type { Request } from 'express';

import { APP_SECRET } from '../../shared/constants/global';

export const ValidateApiKey = (args: Request): void => {
    const api_key_index = args.rawHeaders.indexOf(
        args.rawHeaders.find((key) => key.toLowerCase() === 'x-api-key'),
    );

    const api_key = args.rawHeaders[api_key_index + 1];

    if (!api_key) {
        throw new ForbiddenException('No Token on request');
    }
    if (api_key !== APP_SECRET) {
        throw new ForbiddenException('Incorrect token');
    }
};
