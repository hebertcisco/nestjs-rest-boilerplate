import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    HttpCode,
    Query,
} from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';

import { UserService } from './user.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UserSessionsDto } from './dto/user-sessions.dto';
import { UserListDataDto } from './dto/user-list-data';

@ApiHeader({
    name: 'x-api-key',
    description: 'API-Key for access',
})
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('list')
    @HttpCode(200)
    findUserList(@Query() query: UserListDataDto) {
        return this.userService.findUserList(query);
    }
    @Get()
    @HttpCode(200)
    findAll() {
        return this.userService.findAll();
    }

    @Get(':id')
    @HttpCode(200)
    findOne(@Param('id') id: string) {
        return this.userService.findOne(id);
    }

    @Post('create')
    @HttpCode(201)
    public async create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }
    @Post('sessions')
    @HttpCode(201)
    public async auth(@Body() userSessionsDto: UserSessionsDto) {
        return this.userService.auth(userSessionsDto);
    }
}
