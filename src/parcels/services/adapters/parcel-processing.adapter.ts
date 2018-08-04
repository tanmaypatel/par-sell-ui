import { extend } from 'lodash';
import * as moment from 'moment';

import { ParcelProcessing } from '../../models/parcel-processing';
import { ParcelAdapter } from './parcel.adapter';
import { TractorAdapter } from '../../../tractors/services/adapters/tractor.adapter';

export class ParcelProcessingAdapter {
    static parseAPIResponse(parcelProcessingData: any) {
        return new ParcelProcessing(extend(parcelProcessingData, {
            parcel: ParcelAdapter.parseAPIResponse(parcelProcessingData.parcel),
            tractor: TractorAdapter.parseAPIResponse(parcelProcessingData.tractor),
            date: moment.utc(parcelProcessingData.date),
            createdAt: moment.utc(parcelProcessingData.createdAt),
            updatedAt: moment(parcelProcessingData.updatedAt)
        }));
    }
}
