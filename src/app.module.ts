import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from 'ormconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './models/client/client.module';
import { AuthModule } from './auth/auth.module';
import { ApplicationModule } from './models/application/application.module';
import { UserModule } from './models/user/user.module';

@Module({
    imports: [
        ClientModule,
        AuthModule,
        ApplicationModule,
        ClientModule,
        UserModule,
        TypeOrmModule.forRoot(ormConfig),
    ],
    controllers: [ AppController ],
    providers: [ AppService ],
})
export class AppModule {}
