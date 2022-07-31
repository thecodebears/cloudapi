import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnoroModule } from './enoro/enoro.module';

@Module({
    imports: [EnoroModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
