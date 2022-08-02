import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/models/user/user.module';
import { ClientModule } from 'src/models/client/client.module';

@Module({
    imports: [
        UserModule,
        ClientModule
    ],
    controllers: [ AuthController ],
    providers: [ AuthService ]
})
export class AuthModule {}
