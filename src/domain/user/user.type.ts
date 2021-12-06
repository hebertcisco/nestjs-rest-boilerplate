import { User } from './entities/user.entity';

export type AuthResponse = {
    token: string;
    user: User;
};
export type TUserListSQL = {
    limit: number;
};
export type TUserList = {
    avatar: string;
    name: string;
    email: string;
};
