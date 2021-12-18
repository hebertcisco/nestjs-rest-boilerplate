import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configService } from './infra/config/config.service';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import dotenv from 'dotenv';
import 'reflect-metadata';

dotenv.config();
const port = process.env.PORT;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
        }),
    );
    app.enableCors();
    if (!configService.isProduction()) {
        const config = new DocumentBuilder()
            .setTitle('nestjs-rest-boilerplate')
            .setDescription('')
            .setVersion('0.0.1')
            .addTag('nestjs-rest-boilerplate')
            .build();
        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('docs', app, document);
    }

    await app.listen(port || 3000);
}

bootstrap().then(() => console.log('Server is running on port: ' + port));
