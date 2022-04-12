import { EMAIL, USER_ID } from '../mock';
import { HttpException, HttpStatus } from '@nestjs/common';
import { User } from '../../../src/modules/user/entities/user.entity';
import { CreateUserDto } from '../../../src/modules/user/dto/create-user.dto';

export default class UserServiceMock {
    static giveAmeValidUser(): User {
        const user = new User();
        user.id = USER_ID;
        user.name = 'John Doe';
        user.email = EMAIL;
        user.password = '123456';
        user.avatar = null;
        user.updated_at = new Date('2022-04-12T20:48:20.502Z');
        user.created_at = new Date('2022-04-12T20:48:20.502Z');
        return user;
    }
    async create(createUserDto: CreateUserDto): Promise<User> {
        try {
            if (!createUserDto.email) {
                return Promise.reject(
                    new HttpException(
                        {
                            success: false,
                            error: {
                                message: 'Invalid or email',
                            },
                        },
                        HttpStatus.BAD_REQUEST,
                    ),
                );
            }
            return Promise.resolve(UserServiceMock.giveAmeValidUser());
        } catch (e) {
            throw e;
        }
    }
}
