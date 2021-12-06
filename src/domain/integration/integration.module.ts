import { CacheModule, HttpModule, Module } from '@nestjs/common';
import { IntegrationService } from './integration.service';
import { IntegrationController } from './integration.controller';

@Module({
    imports: [HttpModule, CacheModule.register()],
    controllers: [IntegrationController],
    providers: [IntegrationService],
})
export class IntegrationModule {}
