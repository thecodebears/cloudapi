import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from 'ormconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnoroModule } from './enoro/enoro.module';
import { Account } from './models/account.entity';
import { AccountModule } from './account/account.module';

@Module({
    imports: [
        EnoroModule,
        AccountModule,
        TypeOrmModule.forRoot(ormConfig)
    ],
    controllers: [ AppController ],
    providers: [ AppService ],
})
export class AppModule {}
