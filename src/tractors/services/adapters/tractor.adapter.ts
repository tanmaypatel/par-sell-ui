import { extend } from 'lodash';
import * as moment from 'moment';

import { Tractor } from '../../models/tractor';

export class TractorAdapter {
    static parseAPIResponse(tractorData: any) {
        return new Tractor(extend(tractorData, {
            createdAt: moment.utc(tractorData.createdAt),
            updatedAt: moment(tractorData.updatedAt)
        }));
    }
}
