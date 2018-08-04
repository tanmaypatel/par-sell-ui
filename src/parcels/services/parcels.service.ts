import { Injectable } from '@angular/core';
import { List } from 'immutable';
import { default as axios } from 'axios';
import { map } from 'lodash';

import { Config } from '../../config/configuration.provider';
import { SessionRepository } from '../../common/repositories/session.respository';
import { Parcel } from '../models/parcel';
import { ParcelAdapter } from './adapters/parcel.adapter';

@Injectable()
export class ParcelsService {
    constructor(
        private _configuration: Config,
        private _session: SessionRepository
    ) {}

    async retrieveParcels(pageStart: number = 0, pageSize: number = 1000): Promise<List<Parcel>> {
        const response: any = await axios.request({
            method: 'GET',
            url: `${this._configuration.API_BASE_URL}/parcels`,
            headers: {
                Authorization: `Bearer ${this._session.accessToken}`
            }
        });

        const responseData: any = response.data;

        const parcels: Parcel[] = map(responseData, (datum: any) => {
            return ParcelAdapter.parseAPIResponse(datum);
        });

        return List(parcels);
    }

    async createParcel(parcel: Parcel): Promise<Parcel> {
        const response: any = await axios.request({
            method: 'POST',
            url: `${this._configuration.API_BASE_URL}/parcels`,
            headers: {
                Authorization: `Bearer ${this._session.accessToken}`
            },
            data: {
                name: parcel.name,
                culture: parcel.culture,
                areaInSquareFeet: parcel.areaInSquareFeet
            }
        });

        const responseData: any = response.data;

        const createdParcel: Parcel = ParcelAdapter.parseAPIResponse(responseData);

        return createdParcel;
    }
}
