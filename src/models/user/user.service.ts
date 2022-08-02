import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Security } from "src/utils/security";
import { DeepPartial, FindOptionsWhere, Repository } from "typeorm";
import { User } from "./user.entity";
import { UsersFindQuery } from "./user.types";
import { Client } from '../client/client.entity';
import { UserResponse } from "./user.codes";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

    public async create(username: string, password: string, discordConnection?: string): Promise<User> {
        let user = await this.usersRepository.create({
            username,
            discordConnection,
            password: Security.generateSHA256(password),
            clients: [],
            applications: [],
        });

        return this.usersRepository.save(user);
    }

    public async destroy({ id, username }: UsersFindQuery): Promise<UserResponse> {
        let user = await this.findOneBy({ id, username });
        if (user) {
            await this.usersRepository.remove(user);

            return UserResponse.Destroyed;
        } else {
            return UserResponse.NotFound;
        }
    }

    public async findBy({ id, username }: UsersFindQuery): Promise<User[]> {
        return this.usersRepository.find({ where: [ { id }, { username } ] })
    }

    public async findOneBy({ id, username }: UsersFindQuery): Promise<User> {
        return this.usersRepository.findOne({ where: [ { id }, { username } ] })
    }

    public async findDiscordConnection(id: string): Promise<User> {
        return this.usersRepository.findOne({ where: [ { discordConnection: id } ] });
    }

    public async update({ id, username }: UsersFindQuery, rows: DeepPartial<User>): Promise<UserResponse> {
        let user = await this.findOneBy({ id, username });
        if (user) {
            if (rows.username) {
                if (await this.findOneBy({ username })) {
                    return UserResponse.UsernameWasTaken;
                }
            }

            Object.assign(user, rows);
            await this.usersRepository.save(user);

            return UserResponse.Updated;
        } else {
            return UserResponse.NotFound;
        }
    }

    public async updatePassword({ id, username }: UsersFindQuery, password: string): Promise<UserResponse> {
        return this.update({ id, username }, { password: Security.generateSHA256(password) });
    }

    /**
     * Checks for password matches.
     */
    public async validate({ id, username }: UsersFindQuery, password: string): Promise<UserResponse> {
        let user = await this.findOneBy({ id, username });
        if (user && user.password === Security.generateSHA256(password)) {
            return UserResponse.Valid;
        } else {
            return UserResponse.NotValid;
        }
    }

    /**
     * Links user client to specific user.
     */
    public async loginClient({ id, username }: UsersFindQuery, client: Client): Promise<UserResponse> {
        let user = await this.findOneBy({ id, username }); 
        if (user) {
            if (user.clients.includes(client.id)) {
                return UserResponse.ClientAlreadyLoggedIn;
            }

            user.clients.push(client.id);
            await this.usersRepository.save(user);

            return UserResponse.ClientLoggedIn;
        } else {
            return UserResponse.NotFound;
        }
    }

    /**
     * Unlinks and destroy user client from specific user.
     */
     public async logoutClient({ id, username }: UsersFindQuery, client: Client): Promise<UserResponse> {
        let user = await this.findOneBy({ id, username }); 
        if (user) {
            if (!user.clients.includes(client.id)) {
                return UserResponse.ClientNotLoggedIn;
            }

            user.clients = user.clients.filter(cid => cid !== client.id);
            await this.usersRepository.save(user);

            return UserResponse.ClientLoggedOut;
        } else {
            return UserResponse.NotFound;
        }
    }

    /**
     * Provides access to an application via client.
     */
    public async provideApplication({ id, username }: UsersFindQuery, applicationClient: Client): Promise<UserResponse> {
        let user = await this.findOneBy({ id, username });
        if (user) {
            if (user.applications.includes(applicationClient.id)) {
                return UserResponse.ApplicationAlreadyProvided;
            }

            user.applications.push(applicationClient.id);
            await this.usersRepository.save(user);

            return UserResponse.ApplicationProvided;
        } else {
            return UserResponse.NotFound;
        }
    }

    /**
     * Takes access from an application.
     */
     public async removeProvidedApplication({ id, username }: UsersFindQuery, applicationClient: Client): Promise<UserResponse> {
        let user = await this.findOneBy({ id, username });
        if (user) {
            if (!user.applications.includes(applicationClient.id)) {
                return UserResponse.ApplicationNotProvided;
            }

            user.applications = user.applications.filter(aid => aid !== applicationClient.id);
            await this.usersRepository.save(user);

            return UserResponse.ApplicationRemoved;
        } else {
            return UserResponse.NotFound;
        }
    }
}
