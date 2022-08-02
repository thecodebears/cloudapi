import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../base.entity";

type ClientType = 'user' | 'application';

@Entity()
export class Client extends BaseEntity {
    /**
     * API scope.
     */
    @Column({ type: 'varchar' })
    public type: string;

    /**
     * UUID of linked instance.
     */
    @Column({ type: 'varchar' })
    public instance: string;

    /**
     * Instance access token.
     */
    @Column({ type: 'varchar' })
    public token: string;
}
