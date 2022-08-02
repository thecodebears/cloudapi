import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity()
export class Account extends BaseEntity {
    @Column({ type: 'varchar' })
    public token: string;

    @Column({ type: 'varchar' })
    public name: string;

    @Column({ type: 'boolean', nullable: true })
    public developer: boolean;
}