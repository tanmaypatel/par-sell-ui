import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { NotificationsService } from 'angular2-notifications';

import { ParcelProcessingsRepository } from '../../repositories/parcel-processings.repository';
import { ParcelProcessing } from '../../models/parcel-processing';
import { Parcel } from '../../models/parcel';
import { TractorsRepository } from '../../../tractors/repositories/tractors.repository';

@Component({
    selector: 'app-process-parcel',
    templateUrl: './process-parcel.component.html',
    styleUrls: ['./process-parcel.component.scss']
})
export class ProcessParcelComponent implements OnInit {
    private _parcelForProcessing: Parcel;

    get parcelForProcessing(): Parcel {
        return this._parcelForProcessing;
    }

    @Input()
    set parcelForProcessing(value: Parcel) {
        this._parcelForProcessing = value;
    }

    @Output() parcelProcessed = new EventEmitter<ParcelProcessing>();

    processParcelForm: FormGroup;

    constructor(
        private _processingsRepo: ParcelProcessingsRepository,
        private _notificationsService: NotificationsService,
        public tractorsRepository: TractorsRepository
    ) {
        this.processParcelForm = new FormGroup({
            tractor: new FormControl('', [Validators.required]),
            processingDate: new FormControl('', [Validators.required]),
            occupiedArea: new FormControl('', [Validators.required])
        });
    }

    ngOnInit() {
        this.tractorsRepository.retrieveTractors();
    }

    onProcessParcelFormSubmit() {
        if (this.processParcelForm.valid) {
            const { tractor, processingDate, occupiedArea } = this.processParcelForm.value;

            const parcelProcessing: ParcelProcessing = new ParcelProcessing({
                parcelId: this._parcelForProcessing.parcelId,
                parcel: this._parcelForProcessing,
                tractorId: tractor,
                date: moment.utc(processingDate),
                occupiedAreaInSquareFeet: occupiedArea
            });

            this._processingsRepo
                .processParcel(parcelProcessing)
                .then((processedParcel: ParcelProcessing) => {
                    this._notificationsService.success(
                        'Parcel Processed',
                        `Parcel with name ${processedParcel.parcel.name} processed with Tractor ${processedParcel.tractor.name}`
                    );
                    this.parcelProcessed.emit(processedParcel);
                })
                .catch((error) => {
                    this._notificationsService.error(
                        'Unable to process Parcel',
                        error.message || `Unable to process Parcel with name ${this.parcelForProcessing.name}`
                    );
                });
        }
    }
}
