import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { Account } from '../models/account.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([ Account ]) ],
  providers: [ AccountService ],
  controllers: [ AccountController ],
  exports: []
})
export class AccountModule { }

