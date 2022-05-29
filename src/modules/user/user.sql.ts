import { UserListSQLType } from './user.type';

export class UserSQL {
    public static readonly findUserList = (values: UserListSQLType): string => {
        return `
            SELECT u.avatar, u.name, u.email FROM "user" u
            ORDER BY u.created_at DESC LIMIT ${values.limit || 10}
            `;
    };
}
