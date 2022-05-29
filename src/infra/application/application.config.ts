import dotenv from 'dotenv';

dotenv.config();

class ConfigService {
    constructor(private env: { [k: string]: string | undefined }) {}

    public getValue(key: string, throwOnMissing = true): string {
        const value = this.env[key];
        if (!value && throwOnMissing) {
            throw new Error(`config error - missing env.${key}`);
        }

        return value;
    }

    public getBoolean(key: string): boolean {
        const value = this.getValue(key);
        return value === 'true';
    }

    public ensureValues(keys: string[]) {
        keys.forEach((k) => this.getValue(k, true));
        return this;
    }

    public getPort() {
        return this.getValue('PORT', true);
    }

    public isProduction() {
        return this.getBoolean('NODE_ENV');
    }
}
export { ConfigService };
