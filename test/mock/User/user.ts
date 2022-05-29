import { USER_EMAIL, USER_ID, USER_NAME, USER_PASSWORD_HASHED } from '../mock';
import { BadRequestException } from '@nestjs/common';
import { User } from '../../../src/modules/user/entities/user.entity';
import { CreateUserDto } from '../../../src/modules/user/dto/create-user.dto';

export default class UserServiceMock {
    static giveAmeValidUser(): User {
        const user = new User();
        user.id = USER_ID;
        user.name = USER_NAME;
        user.email = USER_EMAIL;
        user.password = USER_PASSWORD_HASHED;
        user.avatar = null;
        user.updated_at = new Date('2022-04-12T20:48:20.502Z');
        user.created_at = new Date('2022-04-12T20:48:20.502Z');
        return user;
    }
    async create(createUserDto: CreateUserDto): Promise<User> {
        try {
            if (!createUserDto.email) {
                return Promise.reject(
                    new BadRequestException({
                        success: false,
                        error: {
                            message: 'Invalid or email',
                        },
                    }),
                );
            }
            return Promise.resolve(UserServiceMock.giveAmeValidUser());
        } catch (e) {
            throw e;
        }
    }
}
