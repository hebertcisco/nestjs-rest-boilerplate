import type { User } from './entities/user.entity';

export type AuthResponseType = {
    token: string;
    user: User;
};
export type UserListSQLType = {
    limit: number;
};
export type UserListType = {
    avatar: string;
    name: string;
    email: string;
};
