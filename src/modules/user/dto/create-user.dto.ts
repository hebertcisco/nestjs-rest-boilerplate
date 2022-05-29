import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { IsEmail } from 'class-validator';
import { chance } from '../../../../test/mock/chance';

export class CreateUserDto {
    @ApiProperty({ required: true, default: chance.name() })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ required: true, default: chance.email() })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ required: true, default: '123456' })
    @IsString()
    @IsNotEmpty()
    password: string;
}
