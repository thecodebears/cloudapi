import { Injectable } from "@nestjs/common";
import { User } from "./user.entity";
import { EntityService } from "../base.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UserService extends EntityService<User> {
    constructor(@InjectRepository(User) protected readonly repository: Repository<User>) {
        super();
    }
}
