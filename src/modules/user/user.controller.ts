import {
    Controller,
    Post,
    Body,
    Res,
    HttpStatus,
    Get,
    Param,
    Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiHeader } from '@nestjs/swagger';
import { IDatabaseErrorResponse } from '../../shared/interfaces/httpResponses.interface';
import { User } from './entities/user.entity';
import { Response } from 'express';
import { UserSessionsDto } from './dto/user-sessions.dto';
import { AuthResponse } from './user.type';
import { UserListDataDto } from './dto/user-list-data';

@ApiHeader({
    name: 'x-api-key',
    description: 'API-Key for access',
})
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    @Get('list')
    findUserList(@Query() query: UserListDataDto) {
        return this.userService.findUserList(query);
    }
    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.findOne(id);
    }

    @Post('create')
    public async create(
        @Body() createUserDto: CreateUserDto,
        @Res() res: Response,
    ): Promise<void> {
        return await this.userService
            .create(createUserDto, res)
            .then((result: User) => {
                res.status(HttpStatus.CREATED);
                res.json(result);
            })
            .catch((err: IDatabaseErrorResponse) => {
                res.status(err.status);
                res.json({
                    message: err.message,
                    status: err.status,
                });
            });
    }
    @Post('sessions')
    public async auth(
        @Body() userSessionsDto: UserSessionsDto,
        @Res() res: Response,
    ): Promise<void> {
        return await this.userService
            .auth(userSessionsDto)
            .then((result: AuthResponse) => {
                res.status(HttpStatus.CREATED);
                res.json(result);
            })
            .catch((err: IDatabaseErrorResponse) => {
                res.status(err.status);
                res.json({
                    message: err.message,
                    status: err.status,
                });
            });
    }
}
