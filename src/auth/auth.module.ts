import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/models/user/user.module';
import { UtilsModule } from 'src/utils/utils.module';

@Module({
    imports: [
        UserModule,
        UtilsModule
    ],
    controllers: [ AuthController ],
    providers: [ AuthService ]
})
export class AuthModule {}
