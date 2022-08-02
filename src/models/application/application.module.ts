import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationService } from './application.service';
import { Application } from './application.entity';

@Module({
    imports: [ TypeOrmModule.forFeature([ Application ]) ],
    providers: [ ApplicationService ],
    controllers: [],
    exports: [ ApplicationService ]
})
export class ApplicationModule {}
