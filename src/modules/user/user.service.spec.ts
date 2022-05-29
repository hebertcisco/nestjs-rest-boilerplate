import { getRepositoryToken } from '@nestjs/typeorm';

import { Test, TestingModule } from '@nestjs/testing';
import { CacheModule } from '@nestjs/common';

import { UserService } from './user.service';
import UserServiceMock from '../../../test/mock/User/user';

import { User } from './entities/user.entity';

describe('UserService', () => {
    let service: UserService;

    const mockUserRepository = {
        query: jest.fn(),
    };

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [CacheModule.register({})],
            providers: [
                {
                    provide: UserService,
                    useClass: UserServiceMock,
                },

                {
                    provide: getRepositoryToken(User),
                    useValue: mockUserRepository,
                },
            ],
        }).compile();

        service = module.get<UserService>(UserService);
    });

    beforeEach(() => {
        mockUserRepository.query.mockReset();
    });

    describe('UserService methods', () => {
        it('should must create a user with this mocked email', async () => {
            mockUserRepository.query.mockResolvedValue([
                UserServiceMock.giveAmeValidUser(),
            ]);

            const expectedResult = {
                success: true,
                user: UserServiceMock.giveAmeValidUser(),
            };
            const result = await service.create({
                ...UserServiceMock.giveAmeValidUser(),
            });

            expect(result.email).toBe(expectedResult.user.email);
        });
    });
});
