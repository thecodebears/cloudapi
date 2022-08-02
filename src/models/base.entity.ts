import { PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, Entity } from 'typeorm';

@Entity()
export abstract class BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    public id: string;
}
