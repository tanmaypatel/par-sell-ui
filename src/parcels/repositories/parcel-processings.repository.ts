import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { List } from 'immutable';

import { ParcelsService } from '../services/parcels.service';
import { Parcel } from '../models/parcel';
import { ParcelProcessing } from '../models/parcel-processing';
import { ParcelProcessingsService } from '../services/parcel-processings.service';

@Injectable()
export class ParcelProcessingsRepository {
    private _processedParcels: BehaviorSubject<List<ParcelProcessing>> = new BehaviorSubject(List());

    get processedParcels(): BehaviorSubject<List<ParcelProcessing>> {
        return this._processedParcels;
    }

    constructor(private _parcelProcessingsService: ParcelProcessingsService) {}

    async retrieveParcelProcessings(pageStart: number = 0, pageSize: number = 1000): Promise<List<ParcelProcessing>> {
        const parcelProcessings: List<ParcelProcessing> =
            await this._parcelProcessingsService.retrieveParcelProcessings(pageStart, pageSize);

        const mergedParcelProcessings: List<ParcelProcessing> = this._processedParcels.getValue().mergeDeep(parcelProcessings);
        this._processedParcels.next(mergedParcelProcessings);

        return parcelProcessings;
    }

    async processParcel(parcelProcessing: ParcelProcessing): Promise<ParcelProcessing> {
        const processedParcel: ParcelProcessing = await this._parcelProcessingsService.processParcel(parcelProcessing);

        const mergedParcelProcessings: List<ParcelProcessing> = this._processedParcels.getValue().unshift(processedParcel);
        this._processedParcels.next(mergedParcelProcessings);

        return processedParcel;
    }
}
