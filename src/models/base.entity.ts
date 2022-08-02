import { PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, Entity } from 'typeorm';

@Entity()
export abstract class BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({ type: 'boolean', default: true })
    public isActive: boolean;

    @Column({ type: 'boolean', default: false })
    public isArchived: boolean;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    public createDateTime: Date;

    @Column({ type: 'varchar', length: 300 })
    public createdBy: string;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    public lastChangedDateTime: Date;

    @Column({ type: 'varchar', length: 300 })
    public lastChangedBy: string;

    @Column({ type: 'varchar', length: 300, nullable: true })
    public internalComment: string | null;
}
