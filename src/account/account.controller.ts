import { Controller, Get, Post, Query } from "@nestjs/common";
import { AccountService } from "./account.service";

@Controller('account')
export class AccountController {
    constructor(private accountService: AccountService) {}

    @Post('create')
    public async create(@Query('name') name: string) {
        let account = await this.accountService.create(name);

        return account;
    }

    @Get()
    public async get(@Query('name') id: string) {
        let account = await this.accountService.findById(id);

        return account;
    }
}