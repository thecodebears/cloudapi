import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Security } from "src/utils/security";
import { DeepPartial, FindOptionsWhere, Repository } from "typeorm";
import { Application } from "./application.entity";
import { ApplicationsFindQuery } from "./application.types";
import { ApplicationResponse } from "./application.codes";
import { User } from "../user/user.entity";

@Injectable()
export class ApplicationService {
    constructor(@InjectRepository(Application) private applicationsRepository: Repository<Application>) {}
    
    public async create(name: string): Promise<Application> {
        let application = await this.applicationsRepository.create({ name });

        return this.applicationsRepository.save(application);
    }

    public async destroy({ id, name }: ApplicationsFindQuery): Promise<ApplicationResponse> {
        let application = await this.findOneBy({ id, name });
        if (application) {
            await this.applicationsRepository.remove(application);

            return ApplicationResponse.Destroyed;
        } else {
            return ApplicationResponse.NotFound;
        }
    }

    public async findBy({ id, name }: ApplicationsFindQuery): Promise<Application[]> {
        return this.applicationsRepository.find({ where: [ { id }, { name } ] })
    }

    public async findOneBy({ id, name }: ApplicationsFindQuery): Promise<Application> {
        return this.applicationsRepository.findOne({ where: [ { id }, { name } ] })
    }

    public async update({ id, name }: ApplicationsFindQuery, rows: DeepPartial<Application>): Promise<ApplicationResponse> {
        let user = await this.findOneBy({ id, name });
        if (user) {
            if (rows.name) {
                if (await this.findOneBy({ name })) {
                    return ApplicationResponse.NameWasTaken;
                }
            }

            Object.assign(user, rows);
            await this.applicationsRepository.save(user);

            return ApplicationResponse.Updated;
        } else {
            return ApplicationResponse.NotFound;
        }
    }

    public async addOwner({ id, name }: ApplicationsFindQuery, user: User): Promise<ApplicationResponse> {
        let application = await this.findOneBy({ id, name });
        if (application) {
            if (application.owners.includes(user.id)) {
                return ApplicationResponse.OwnerAlreadyExists;
            }

            application.owners.push(user.id);
            await this.applicationsRepository.save(application);

            return ApplicationResponse.OwnerAdded;
        } else {
            return ApplicationResponse.NotFound;
        }
    }

    public async removeOwner({ id, name }: ApplicationsFindQuery, user: User): Promise<ApplicationResponse> {
        let application = await this.findOneBy({ id, name });
        if (application) {
            if (!application.owners.includes(user.id)) {
                return ApplicationResponse.OwnerNotExists;
            }

            application.owners = application.owners.filter(uid => uid !== user.id);
            await this.applicationsRepository.save(application);

            return ApplicationResponse.OwnerRemoved;
        } else {
            return ApplicationResponse.NotFound;
        }
    }
}
