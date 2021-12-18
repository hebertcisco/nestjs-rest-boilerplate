import {
    HttpException,
    HttpService,
    HttpStatus,
    Injectable,
} from '@nestjs/common';
import * as uuid from 'uuid';
import * as https from 'https';
import { ConfigService } from '../../shared/services/PostgreSQL.service';
import Console from 'beautlog';

export interface IIntegrationResponseAuth {
    access_token: string;
    expires_in: number;
}
@Injectable()
export class IntegrationService {
    protected readonly baseURL: string;
    protected readonly uuid: string;
    protected readonly client_secret: string;
    protected readonly client_id: string;

    protected readonly configService;
    protected isProduction: boolean;
    public auth_data: Promise<IIntegrationResponseAuth>;

    constructor(protected httpService: HttpService) {
        this.configService = new ConfigService();
        this.uuid = uuid.v4();
        this.baseURL = this.configService.getValue(
            'BASE_URL_EXTERNAL_INTEGRATION',
        );
        this.client_secret = this.configService.getValue(
            'CLIENT_SECRET_EXTERNAL_INTEGRATION',
        );
        this.client_id = this.configService.getValue(
            'CLIENT_ID_EXTERNAL_INTEGRATION',
        );
        this.auth_data = this.generateTokenAuth();
        this.isProduction = new ConfigService().isProduction();
    }
    private generateTokenAuth() {
        Console.WriteLine('Generating token...');
        return this.httpService
            .post(
                `${this.baseURL}/authorization`,
                new URLSearchParams({
                    grant_type: 'client_credentials',
                    client_id: this.client_id,
                    client_secret: this.client_secret,
                }),
                this.getConfigsAuth(),
            )
            .toPromise()
            .then(({ data }) => {
                Console.ok('Token generated!');
                return data;
            })
            .then(async (result: IIntegrationResponseAuth) => {
                return result;
            })
            .catch(async (e) => {
                throw new HttpException(e, HttpStatus.BAD_REQUEST);
            });
    }
    protected static getAgent() {
        const options = {
            rejectUnauthorized: false,
            keepAlive: false,
        };

        return new https.Agent(options);
    }
    private getHeadersAuth = () => ({
        'Content-Type': 'application/json',
    });
    private getConfigsAuth = () => ({
        httpsAgent: IntegrationService.getAgent(),
        headers: this.getHeadersAuth(),
    });
    protected getHeaders = (token: string) => ({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    });

    protected getConfig = (token: string) => ({
        httpsAgent: IntegrationService.getAgent(),
        headers: this.getHeaders(token),
    });
}
