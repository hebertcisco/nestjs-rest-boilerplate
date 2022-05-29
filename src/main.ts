#!/usr/bin/env node
import 'reflect-metadata';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import dotenv from 'dotenv';
import helmet from 'helmet';
import compression from 'compression';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import { PORT } from 'nest-shared/lib/shared/common/constants/global.constants';

import { AppModule } from './app.module';
import { configService } from './infra/application/application.config';
import * as pkg from '../package.json';

dotenv.config();

async function bootstrap(): Promise<void> {
    const app: INestApplication = await NestFactory.create(AppModule);

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
        }),
    );
    app.enableCors();
    app.use(helmet());
    app.use(compression());
    app.use(bodyParser.json({ limit: '15mb' }));
    app.use(bodyParser.urlencoded({ limit: '15mb', extended: true }));
    app.use(
        morgan(
            ':date[iso] HTTP/:http-version :method :url :status :response-time ms',
        ),
    );
    if (!configService.isProduction()) {
        const config = new DocumentBuilder()
            .setTitle(pkg.name)
            .setDescription(pkg.description)
            .setVersion(pkg.version)
            .setTitle(pkg.name)
            .build();
        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('docs', app, document);
    }

    await app.listen(PORT);
}

((): void => {
    bootstrap()
        .then(() => process.stdout.write(`Listening on port ${PORT}...\n`))
        .catch((err) => {
            process.stderr.write(`Error: ${err.message}\n`);
            process.exit(1);
        });
})();
