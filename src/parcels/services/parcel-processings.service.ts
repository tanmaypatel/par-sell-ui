import { Injectable } from '@angular/core';
import { List } from 'immutable';
import { default as axios } from 'axios';
import { map } from 'lodash';

import { Config } from '../../config/configuration.provider';
import { SessionRepository } from '../../common/repositories/session.respository';
import { ParcelProcessing } from '../models/parcel-processing';
import { ParcelProcessingAdapter } from './adapters/parcel-processing.adapter';

@Injectable()
export class ParcelProcessingsService {
    constructor(private _configuration: Config, private _session: SessionRepository) {}

    async retrieveParcelProcessings(pageStart: number = 0, pageSize: number = 1000): Promise<List<ParcelProcessing>> {
        try {
            const response: any = await axios.request({
                method: 'GET',
                url: `${this._configuration.API_BASE_URL}/parcels/processed`,
                headers: {
                    Authorization: `Bearer ${this._session.accessToken}`
                }
            });

            const responseData: any = response.data;

            const parcelProcessings: ParcelProcessing[] = map(responseData, (datum: any) => {
                return ParcelProcessingAdapter.parseAPIResponse(datum);
            });

            return List(parcelProcessings);
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data.message);
            } else {
                throw error;
            }
        }
    }

    async processParcel(parcelProcessing: ParcelProcessing): Promise<ParcelProcessing> {
        try {
            const response: any = await axios.request({
                method: 'POST',
                url: `${this._configuration.API_BASE_URL}/parcels/process`,
                headers: {
                    Authorization: `Bearer ${this._session.accessToken}`
                },
                data: {
                    parcelId: parcelProcessing.parcelId,
                    tractorId: parcelProcessing.tractorId,
                    date: parcelProcessing.date.format('YYYY-MM-DD'),
                    occupiedAreaInSquareFeet: parcelProcessing.occupiedAreaInSquareFeet
                }
            });

            const responseData: any = response.data;

            const processingParcel: ParcelProcessing = ParcelProcessingAdapter.parseAPIResponse(responseData);

            return processingParcel;
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data.message);
            } else {
                throw error;
            }
        }
    }
}
