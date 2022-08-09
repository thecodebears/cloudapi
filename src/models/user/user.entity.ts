import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../base.entity";

@Entity()
export class User extends BaseEntity {
    @Column({ type: 'varchar' })
    public username: string;

    @Column({ type: 'varchar' })
    public password: string;

    @Column({ type: 'varchar', nullable: true })
    public token: string;
}
