import { extend } from 'lodash';
import * as moment from 'moment';

import { Parcel } from '../../models/parcel';

export class ParcelAdapter {
    static parseAPIResponse(parcelData: any) {
        return new Parcel(extend(parcelData, {
            createdAt: moment.utc(parcelData.createdAt),
            updatedAt: moment(parcelData.updatedAt)
        }));
    }
}
