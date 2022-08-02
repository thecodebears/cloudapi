import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientService } from './client.service';
import { Client } from './client.entity';

@Module({
    imports: [ TypeOrmModule.forFeature([ Client ]) ],
    providers: [ ClientService ],
    controllers: [],
    exports: [ ClientService ]
})
export class ClientModule { }
