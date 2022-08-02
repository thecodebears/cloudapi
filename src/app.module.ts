import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from 'ormconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigService } from './config/config.service';
import { EnoroModule } from './enoro/enoro.module';
import { AccountModule } from './models/account/account.model';

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
