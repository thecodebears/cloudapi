import { FindManyOptions, ObjectLiteral, Repository } from "typeorm";
import { EntityResponse, Columns } from "./base.types";

export class EntityService<T extends ObjectLiteral> {
    protected repository: Repository<T>;

    public async create(rows: Columns<T>): Promise<T> {
        let user = await this.repository.create(rows);

        return this.repository.save(user);
    }

    public async destroy(findByRows: Columns<T>): Promise<EntityResponse> {
        let user = await this.findOneBy(findByRows);
        if (user) {
            await this.repository.remove(user);

            return EntityResponse.Destroyed;
        } else {
            return EntityResponse.NotFound;
        }
    }

    public async findBy(rows: Columns<T>): Promise<T[]> {
        return this.repository.find({ where: 
            Object.entries(rows).map(e => { return { [e[0]]: e[1] } })
        } as FindManyOptions<T>);
    }

    public async findOneBy(rows: Columns<T>): Promise<T> {
        return this.repository.findOne({ where: 
            Object.entries(rows).map(e => { return { [e[0]]: e[1] } })
        } as FindManyOptions<T>);
    }
}