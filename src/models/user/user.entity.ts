import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../base.entity";

@Entity()
export class User extends BaseEntity {
    @Column({ type: 'varchar' })
    public username: string;

    @Column({ type: 'varchar' })
    public password: string;

    /**
     * Connected Discord account.
     */
    @Column({ type: 'varchar', nullable: true })
    public discordConnection: string;

    /**
     * Grants access to developer methods and applications.
     */
    @Column({ type: 'boolean', nullable: true })
    public developer: boolean;

    /**
     * List of UUIDs of active clients.
     */
    @Column({ type: 'varchar', array: true })
    public clients: string[];

    /**
     * Client access tokens of owned applications.
     */
    @Column({ type: 'varchar', array: true })
    public applications: string[];
}
