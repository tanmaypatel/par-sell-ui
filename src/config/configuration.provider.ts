import { Injectable } from '@angular/core';

import * as packageData from '../../package.json';

export enum Environment {
    LOCAL,
    DEVELOPMENT,
    STAGING,
    PRODUCTION
}

@Injectable()
export class Config {
    get ENVIRONMENT(): Environment {
        return Environment.DEVELOPMENT;
    }

    get ENVIRONMENT_NAME(): string {
        if (this.ENVIRONMENT === Environment.PRODUCTION) {
            return 'PRODUCTION';
        } else if (this.ENVIRONMENT === Environment.STAGING) {
            return 'STAGING';
        } else if (this.ENVIRONMENT === Environment.LOCAL) {
            return 'LOCAL';
        }

        return 'DEVELOPMENT';
    }

    get APPLICATION_VERSION(): string {
        let environmentModifier = '';
        if (this.ENVIRONMENT !== Environment.PRODUCTION) {
            environmentModifier = `-${this.ENVIRONMENT_NAME.toLowerCase()}`;
        }

        return `${(packageData as any).version}${environmentModifier}`;
    }

    get API_BASE_URL(): string {
        if (this.ENVIRONMENT === Environment.PRODUCTION) {
            return 'PRODUCTION';
        } else if (this.ENVIRONMENT === Environment.STAGING) {
            return 'http://13.232.129.192:8669';
        } else if (this.ENVIRONMENT === Environment.LOCAL) {
            return 'http://localhost:8669';
        }

        return 'http://localhost:8669';
    }

    get DEFAULT_API_TIMEOUT(): number {
        return 1000 * 60 * 10;
    }
}
