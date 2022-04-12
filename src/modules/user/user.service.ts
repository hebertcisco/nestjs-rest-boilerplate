import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import bcrypt from 'bcryptjs';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import jwt from 'jsonwebtoken';
import { UserSessionsDto } from './dto/user-sessions.dto';
import authConfig from '../../infra/config/auth';
import { AuthResponse, TUserList } from './user.type';
import { UserSQL } from './user.sql';
import { UserListDataDto } from './dto/user-list-data';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly user_repo: Repository<User>,
    ) {}
    public async findUserList(dto: UserListDataDto): Promise<TUserList[]> {
        return await this.user_repo.query(
            UserSQL.findUserList({
                ...dto,
            }),
        );
    }
    public async findAll(): Promise<User[]> {
        return await this.user_repo.find();
    }
    public async findOne(id: string): Promise<User> {
        return await this.user_repo.findOne(id);
    }
    public async create(createUserDto: CreateUserDto) {
        try {
            const passwordHash = await bcrypt.hash(createUserDto.password, 8);
            const user = this.user_repo.create({
                ...createUserDto,
                password: passwordHash,
            });
            return this.user_repo.save(user);
        } catch (error) {
            throw error;
        }
    }
    async auth(userSessionsDto: UserSessionsDto): Promise<AuthResponse> {
        const user = await this.user_repo.findOne({
            where: {
                email: userSessionsDto.email,
            },
        });

        return new Promise(async (resolve, reject) => {
            if (!user) {
                return reject(
                    new HttpException(
                        'Usuário não encontrado',
                        HttpStatus.NOT_FOUND,
                    ),
                );
            }

            const passwordMatched = await bcrypt.compare(
                userSessionsDto.password,
                user.password,
            );

            if (!passwordMatched) {
                return reject(
                    new HttpException(
                        'Senha inválida',
                        HttpStatus.UNAUTHORIZED,
                    ),
                );
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
