import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserListDataDto {
    @ApiProperty({ required: false, default: 10 })
    @IsString()
    limit: number;
}
