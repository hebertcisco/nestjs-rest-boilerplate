import {
    Module,
    NestModule,
    MiddlewareConsumer,
    RequestMethod,
    CacheModule,
    CacheInterceptor,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesMiddleware } from './infra/auth/roles.middleware';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UserModule } from './modules/user/user.module';
import { typeormConfig } from './infra/database/typeorm/typeorm.config';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'public'),
        }),
        TypeOrmModule.forRoot(typeormConfig.getTypeOrmConfig()),
        CacheModule.register(),
        ThrottlerModule.forRoot({
            ttl: 60 * 60,
            limit: 60,
        }),
        UserModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_INTERCEPTOR,
            useClass: CacheInterceptor,
        },
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(RolesMiddleware)
            .exclude(
                { path: 'status', method: RequestMethod.GET },
                { path: '/', method: RequestMethod.GET },
            )
            .forRoutes('*');
    }
}
