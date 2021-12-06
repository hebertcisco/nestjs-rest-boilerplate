import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import uploadConfig from '../../../infra/config/upload';
import { IsNotEmpty, IsString } from 'class-validator';

@Entity({ name: 'user' })
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    name: string;

    @Column({ name: 'email', type: 'varchar', nullable: false, unique: true })
    @IsString()
    @IsNotEmpty()
    email: string;

    @Column()
    @Exclude()
    @IsString()
    @IsNotEmpty()
    password: string;

    @Column({ nullable: true })
    avatar: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Expose({ name: 'avatar_url' })
    getAvatarUrl(): string | null {
        const DEFAULT_AVATAR_URL =
            'https://pixabay.com/get/gf8dc2d70ef1b52a62b48c9c2db23212490d0c0aba218622a6510e47ebde8057f8f145d0d05b7f01213c1ed6895b63264ad46f3e3d2d075a53611ea90395f7fe65b96762386ff610fa6255616e83f0875_1280.png';
        if (!this.avatar) {
            return DEFAULT_AVATAR_URL;
        }

        switch (uploadConfig.driver) {
            case 'disk':
                return `${process.env.APP_API_URL}/files/${this.avatar}`;
            case 's3':
                return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.avatar}`;
            default:
                return DEFAULT_AVATAR_URL;
        }
    }
}
