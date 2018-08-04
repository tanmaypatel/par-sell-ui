import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { List } from 'immutable';

import { ParcelsService } from '../services/parcels.service';
import { Parcel } from '../models/parcel';

@Injectable()
export class ParcelsRepository {

    private _parcels: BehaviorSubject<List<Parcel>> = new BehaviorSubject(List());

    get parcels(): BehaviorSubject<List<Parcel>> {
        return this._parcels;
    }

    constructor(private _parcelsService: ParcelsService) {}

    async retrieveParcels(pageStart: number = 0, pageSize: number = 1000): Promise<List<Parcel>> {
        const parcels: List<Parcel> = await this._parcelsService.retrieveParcels(pageStart, pageSize);

        const mergedParcels: List<Parcel> = this._parcels.getValue().mergeDeep(parcels);
        this._parcels.next(mergedParcels);

        return parcels;
    }

    async createParcel(parcel: Parcel): Promise<Parcel> {
        const createdParcel: Parcel = await this._parcelsService.createParcel(parcel);

        const mergedParcels: List<Parcel> = this._parcels.getValue().unshift(createdParcel);
        this._parcels.next(mergedParcels);

        return createdParcel;
    }
}
