import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../base.entity";

@Entity()
export class Account extends BaseEntity {
    @Column({ type: 'string' })
    public token: string;

    @Column({ type: 'string' })
    public name: string;

    @Column({ type: 'boolean' })
    public developer: boolean;
}