import { Injectable } from '@angular/core';
import { List } from 'immutable';
import { default as axios } from 'axios';
import { map } from 'lodash';

import { Config } from '../../config/configuration.provider';
import { SessionRepository } from '../../common/repositories/session.respository';
import { Tractor } from '../models/tractor';
import { TractorAdapter } from './adapters/tractor.adapter';

@Injectable()
export class TractorsService {
    constructor(
        private _configuration: Config,
        private _session: SessionRepository
    ) {}

    async retrieveTractors(pageStart: number = 0, pageSize: number = 1000): Promise<List<Tractor>> {
        const response: any = await axios.request({
            method: 'GET',
            url: `${this._configuration.API_BASE_URL}/tractors`,
            headers: {
                Authorization: `Bearer ${this._session.accessToken}`
            }
        });

        const responseData: any = response.data;

        const tractors: Tractor[] = map(responseData, (datum: any) => {
            return TractorAdapter.parseAPIResponse(datum);
        });

        return List(tractors);
    }

    async createTractor(tractor: Tractor): Promise<Tractor> {
        const response: any = await axios.request({
            method: 'POST',
            url: `${this._configuration.API_BASE_URL}/tractors`,
            headers: {
                Authorization: `Bearer ${this._session.accessToken}`
            },
            data: {
                name: tractor.name
            }
        });

        const responseData: any = response.data;

        const createdTractor: Tractor = TractorAdapter.parseAPIResponse(responseData);

        return createdTractor;
    }
}
