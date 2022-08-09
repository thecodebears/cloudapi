import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './models/user/user.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService, private readonly userService: UserService) {}

    @Get()
    public index(): string {
        return '<a href="https://github.com/thecodebears">Check our Github team!</a>';
    }
}
