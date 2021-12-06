import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get('/')
    index(@Res() res: Response) {
        res.status(302).redirect('/status');
    }
    @Get('/status')
    info(@Res() res: Response) {
        res.status(200);
        res.json(this.appService.info());
    }
}
