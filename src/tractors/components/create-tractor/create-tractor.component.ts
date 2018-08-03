import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { TractorsRepository } from '../../repositories/tractors.repository';
import { Tractor } from '../../models/tractor';

@Component({
    selector: 'app-create-tractor',
    templateUrl: './create-tractor.component.html',
    styleUrls: ['./create-tractor.component.scss']
})
export class CreateTractorComponent {
    @Output() tractorCreated = new EventEmitter<Tractor>();

    createTractorForm: FormGroup;

    constructor(private _tractorsRepo: TractorsRepository) {
        this.createTractorForm = new FormGroup({
            tractorName: new FormControl('', [Validators.required])
        });
    }

    onCreateTractorFormSubmit() {
      if (this.createTractorForm.valid) {
          const { tractorName } = this.createTractorForm.value;

          const tractor: Tractor = new Tractor({
            name: tractorName
          });

          this._tractorsRepo
              .createTractor(tractor)
              .then((createdTractor: Tractor) => {
                  this.tractorCreated.emit(createdTractor);
              });
      }
  }
}
