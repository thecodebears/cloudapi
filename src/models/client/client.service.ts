import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Security } from "src/utils/security";
import { FindOptionsWhere, Repository } from "typeorm";
import { ClientResponse } from "./client.codes";
import { Client } from "./client.entity";
import { ClientAuthParameters, ClientsFindQuery, ClientType } from "./client.types";

@Injectable()
export class ClientService {
    constructor(@InjectRepository(Client) private clientsRepository: Repository<Client>) {}

    public async create(type: ClientType, instance: string): Promise<Client> {
        let client = await this.clientsRepository.create({
            type,
            instance,
            token: Security.generateToken(type + instance)
        });

        return this.clientsRepository.save(client);
    }

    public async destroy({ id, token, instance }: ClientsFindQuery): Promise<ClientResponse> {
        let client = await this.findOneBy({ id, token, instance });
        if (client) {
            await this.clientsRepository.remove(client);

            return ClientResponse.Destroyed;
        } else {
            return ClientResponse.NotFound;
        }
    }

    public async findBy({ id, token, instance }: ClientsFindQuery): Promise<Client[]> {
        return this.clientsRepository.find({ where: [ { id }, { token }, { instance } ] })
    }

    public async findOneBy({ id, token, instance }: ClientsFindQuery): Promise<Client> {
        return this.clientsRepository.findOne({ where: [ { id }, { token }, { instance } ] })
    }

    public async authorize(token: string): Promise<ClientAuthParameters | ClientResponse> {
        let client = await this.findOneBy({ token });
        if (client) {
            return {
                type: client.type,
                instance: client.instance
            } as ClientAuthParameters;
        } else {
            return ClientResponse.NotFound;
        }
    }
}
