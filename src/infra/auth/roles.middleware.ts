import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ValidateApiKey } from './roles.decorator';

@Injectable()
export class RolesMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        ValidateApiKey(req);
        next();
    }
}
