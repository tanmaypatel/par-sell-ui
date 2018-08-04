import { Component, OnInit } from '@angular/core';

import { ParcelProcessingsRepository } from '../../repositories/parcel-processings.repository';

@Component({
    selector: 'app-parcel-processings-page',
    templateUrl: './parcel-processings.page.html',
    styleUrls: ['./parcel-processings.page.scss']
})
export class ParcelProcessingsPageComponent implements OnInit {

    constructor(public processingsRepo: ParcelProcessingsRepository) {}

    ngOnInit() {
        this.retrieveParcelProcessings();
    }

    retrieveParcelProcessings() {
        this.processingsRepo.retrieveParcelProcessings();
    }
}
