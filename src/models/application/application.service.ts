import { Injectable } from "@nestjs/common";
import { Application } from "./application.entity";
import { EntityService } from "../base.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class ApplicationService extends EntityService<Application> {
    constructor(@InjectRepository(Application) protected readonly repository: Repository<Application>) {
        super();
    }
}
