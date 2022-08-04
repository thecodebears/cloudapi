import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from 'ormconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './models/user/user.module';

@Module({
    imports: [
        AuthModule,
        UserModule,
        TypeOrmModule.forRoot(ormConfig),
    ],
    controllers: [ AppController ],
    providers: [ AppService ],
})
export class AppModule {}
