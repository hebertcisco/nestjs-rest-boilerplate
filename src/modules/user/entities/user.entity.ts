import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
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
}
