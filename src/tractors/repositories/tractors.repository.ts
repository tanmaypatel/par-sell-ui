import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { List } from 'immutable';

import { TractorsService } from '../services/tractors.service';
import { Tractor } from '../models/tractor';

@Injectable()
export class TractorsRepository {

    private _tractors: BehaviorSubject<List<Tractor>> = new BehaviorSubject(List());

    get tractors(): BehaviorSubject<List<Tractor>> {
        return this._tractors;
    }

    constructor(private _tractorsService: TractorsService) {}

    async retrieveTractors(pageStart: number = 0, pageSize: number = 1000): Promise<List<Tractor>> {
        const tractors: List<Tractor> = await this._tractorsService.retrieveTractors(pageStart, pageSize);

        const mergedTractors: List<Tractor> = this._tractors.getValue().mergeDeep(tractors);
        this._tractors.next(mergedTractors);

        return tractors;
    }

    async createTractor(tractor: Tractor): Promise<Tractor> {
        const createdTractor: Tractor = await this._tractorsService.createTractor(tractor);

        const mergedTractors: List<Tractor> = this._tractors.getValue().push(createdTractor);
        this._tractors.next(mergedTractors);

        return createdTractor;
    }
}
