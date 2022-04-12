import {
    CacheInterceptor,
    Controller,
    Get,
    HttpCode,
    Res,
    UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
@UseInterceptors(CacheInterceptor)
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get('/')
    @HttpCode(302)
    index(@Res() res: Response) {
        res.redirect('/status');
    }
    @Get('/status')
    @HttpCode(200)
    info() {
        return this.appService.info();
    }
}
