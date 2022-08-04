import { FindManyOptions, ObjectLiteral, Repository } from "typeorm";
import { EntityResponse, Rows } from "./base.types";

export class EntityService<T extends ObjectLiteral> {
    protected repository: Repository<T>;

    public async create(rows: Rows<T>): Promise<T> {
        let user = await this.repository.create(rows);

        return this.repository.save(user);
    }

    public async destroy(findByRows: Rows<T>): Promise<EntityResponse> {
        let user = await this.findOneBy(findByRows);
        if (user) {
            await this.repository.remove(user);

            return EntityResponse.Destroyed;
        } else {
            return EntityResponse.NotFound;
        }
    }

    public async findBy(rows: Rows<T>): Promise<T[]> {
        return this.repository.find({ where: 
            Object.entries(rows).map(e => { return { [e[0]]: e[1] } })
        } as FindManyOptions<T>);
    }

    public async findOneBy(rows: Rows<T>): Promise<T> {
        return this.repository.findOne({ where: 
            Object.entries(rows).map(e => { return { [e[0]]: e[1] } })
        } as FindManyOptions<T>);
    }
}