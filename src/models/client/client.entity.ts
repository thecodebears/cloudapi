import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../base.entity";
import { ClientType } from "./client.types";

@Entity()
export class Client extends BaseEntity {
    /**
     * API scope.
     */
    @Column({ type: 'varchar' })
    public type: ClientType;

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
