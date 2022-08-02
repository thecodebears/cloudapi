import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../base.entity";

type ApplicationType = 'bot' | 'service' | 'developer';

@Entity()
export class Application extends BaseEntity {
    /**
     * API scope.
     */
    @Column({ type: 'varchar' })
    public type: ApplicationType;

    @Column({ type: 'varchar' })
    public name: string;

    @Column({ type: 'varchar' })
    public description: string;

    @Column({ type: 'varchar', array: true })
    public owners: string[];
}
