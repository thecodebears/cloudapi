import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Security } from "src/utils/security";
import { FindOptionsWhere, Repository } from "typeorm";
import { Account } from "../models/account.entity";

@Injectable()
export class AccountService {
    constructor(@InjectRepository(Account) private accountRepository: Repository<Account>) {}

    public findAll(): Promise<Account[]> {
        return this.accountRepository.find();
    }

    public findById(id: string): Promise<Account> {
        try {
            return this.accountRepository.findOne({ where: { id } });
        } catch(e) {
            /**
             * Not exists.
             */
            return null;
        }
    }

    public async create(name: string): Promise<Account> {
        const account = await this.accountRepository.create({
            name,
            token: Security.generateToken(name)
        });

        return this.accountRepository.save(account);
    }

    public async update(id: string, rows: FindOptionsWhere<Account>): Promise<Account> {
        let account = await this.findById(id);
        
        if (account) {
            Object.assign(account, rows);

            return this.accountRepository.save(account);
        } else {
            return null;
        }
    }
}