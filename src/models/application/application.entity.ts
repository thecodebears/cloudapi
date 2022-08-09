import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../base.entity";

@Entity()
export class Application extends BaseEntity {
    @Column({ type: 'varchar' })
    public name: string;

    @Column({ type: 'varchar' })
    public description: string;
}
