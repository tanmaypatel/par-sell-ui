import { Injectable } from '@angular/core';
import { default as axios } from 'axios';

import { Config } from '../../config/configuration.provider';
import { SessionRepository } from '../repositories/session.respository';
import { User } from '../models/user';

export interface IAuthenticationDetails {
    accessToken: string;
    profile: User;
}

@Injectable()
export class AuthService {
    constructor(
        private _configuration: Config,
        private _session: SessionRepository
    ) {}

    async authenticate(
        email: string,
        password: string
    ): Promise<IAuthenticationDetails> {
        const response: any = await axios.request({
            method: 'POST',
            url: `${this._configuration.API_BASE_URL}/auth/login`,
            headers: {
                Authorization: `Basic ${btoa(email + ':' + password)}`
            }
        });

        const responseData: any = response.data;

        const authenticationDetails: IAuthenticationDetails = {
            accessToken: responseData.accessToken,
            profile: new User(responseData.profile)
        };

        this._session.activateSession(
            authenticationDetails.accessToken,
            authenticationDetails.profile
        );

        return authenticationDetails;
    }
}
