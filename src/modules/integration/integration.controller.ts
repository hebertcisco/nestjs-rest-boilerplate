import { Controller } from '@nestjs/common';
import { IntegrationService } from './integration.service';

@Controller('integration')
export class IntegrationController {
    constructor(private readonly transfeeraService: IntegrationService) {}
}
