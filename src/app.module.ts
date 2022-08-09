import { applicationConfig } from './../config/application.config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from 'ormconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './models/user/user.module';
import { integrationsConfig } from 'config/integrations.config';
import { ApplicationModule } from './models/application/application.module';
import { UtilsModule } from './utils/utils.module';

@Module({
    imports: [
        AuthModule,
        UserModule,
        ApplicationModule,
        UtilsModule,
        TypeOrmModule.forRoot(ormConfig),
        ConfigModule.forRoot({
            isGlobal: true,
            load: [ applicationConfig, integrationsConfig ]
        })
    ],
    controllers: [ AppController ],
    providers: [ AppService ],
})
export class AppModule {}
