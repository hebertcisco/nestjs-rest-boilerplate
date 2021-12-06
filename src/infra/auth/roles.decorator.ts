import { APP_SECRET } from '../../shared/constants/global';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Request } from 'express';

export const ValidateApiKey = (args: Request) => {
    const api_key_index = args.rawHeaders.indexOf(
        args.rawHeaders.find((key) => key.toLowerCase() === 'x-api-key'),
    );

    const api_key = args.rawHeaders[api_key_index + 1];

    if (!api_key) {
        throw new HttpException('No Token on request', HttpStatus.BAD_REQUEST);
    }
    if (api_key !== APP_SECRET) {
        throw new HttpException('Incorrect token', HttpStatus.BAD_REQUEST);
    }
};
