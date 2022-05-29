import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { UserSQL } from './user.sql';

import { User } from './entities/user.entity';

import authConfig from '../../infra/auth/auth';

import type { UserListDataDto } from './dto/user-list-data';
import type { UserSessionsDto } from './dto/user-sessions.dto';
import type { CreateUserDto } from './dto/create-user.dto';
import type { AuthResponseType, UserListType } from './user.type';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}
    public async findUserList(dto: UserListDataDto): Promise<UserListType[]> {
        return await this.userRepository.query(
            UserSQL.findUserList({
                ...dto,
            }),
        );
    }
    public async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }
    public async findOne(id: string): Promise<User> {
        return await this.userRepository.findOne(id);
    }
    public async create(createUserDto: CreateUserDto) {
        try {
            const passwordHash = await bcrypt.hash(createUserDto.password, 8);
            const user = this.userRepository.create({
                ...createUserDto,
                password: passwordHash,
            });
            return this.userRepository.save(user);
        } catch (error) {
            throw error;
        }
    }
    public async auth(
        userSessionsDto: UserSessionsDto,
    ): Promise<AuthResponseType> {
        const user = await this.userRepository.findOne({
            where: {
                email: userSessionsDto.email,
            },
        });

        return new Promise(async (resolve, reject) => {
            if (!user) {
                return reject(new NotFoundException('User not found'));
            }

            const passwordMatched = await bcrypt.compare(
                userSessionsDto.password,
                user.password,
            );

            if (!passwordMatched) {
                return reject(new UnauthorizedException('Invalid password!'));
            }

            const token = jwt.sign({ id: user.id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            });

            return resolve({
                token,
                user,
            });
        });
    }
}
