import { NestFactory } from '@nestjs/core';
import { applicationConfig } from 'config/application.config';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.use(cookieParser());

    await app.listen(applicationConfig().port);
}
bootstrap();
