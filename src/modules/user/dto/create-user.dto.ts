import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { IsEmail } from 'class-validator';
import { randomString } from '../../../shared/helpers/random.int';

export class CreateUserDto {
    @ApiProperty({ required: true, default: `fulano` })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ required: true, default: `fulano@gmail.com` })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ required: true, default: `${randomString(8, 'a')}` })
    @IsString()
    @IsNotEmpty()
    password: string;
}
