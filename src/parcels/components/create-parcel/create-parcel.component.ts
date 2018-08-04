import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ParcelsRepository } from '../../repositories/parcels.repository';
import { Parcel } from '../../models/parcel';

@Component({
    selector: 'app-create-parcel',
    templateUrl: './create-parcel.component.html',
    styleUrls: ['./create-parcel.component.scss']
})
export class CreateParcelComponent {
    @Output() parcelCreated = new EventEmitter<Parcel>();

    createParcelForm: FormGroup;

    constructor(private _parcelsRepo: ParcelsRepository) {
        this.createParcelForm = new FormGroup({
            parcelName: new FormControl('', [Validators.required]),
            culture: new FormControl('', [Validators.required]),
            area: new FormControl('', [Validators.required, Validators.pattern(/^[1-9]\d*(\.\d+)?$/)])
        });
    }

    onCreateParcelFormSubmit() {
      if (this.createParcelForm.valid) {
          const { parcelName, culture, area } = this.createParcelForm.value;

          const parcel: Parcel = new Parcel({
            name: parcelName,
            culture: culture,
            areaInSquareFeet: area
          });

          this._parcelsRepo
              .createParcel(parcel)
              .then((createdParcel: Parcel) => {
                  this.parcelCreated.emit(createdParcel);
              });
      }
  }
}
