import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { ParcelsRepository } from '../../repositories/parcels.repository';
import { Parcel } from '../../models/parcel';

@Component({
    selector: 'app-parcels-page',
    templateUrl: './parcels.page.html',
    styleUrls: ['./parcels.page.scss']
})
export class ParcelsPageComponent implements OnInit {

    @ViewChild('createParcelModalContent') createParcelModalContent: TemplateRef<any>;
    private _createParcelModalRef: NgbModalRef;

    @ViewChild('processParcelModalContent') processParcelModalContent: TemplateRef<any>;
    private _processParcelModalRef: NgbModalRef;
    public selectedParcelForProcessing: Parcel = null;

    constructor(public parcelsRepo: ParcelsRepository, private _modalService: NgbModal) {}

    ngOnInit() {
        this.retrieveParcels();
    }

    retrieveParcels() {
        this.parcelsRepo.retrieveParcels();
    }

    openCreateParcelModal() {
      this._createParcelModalRef = this._modalService.open(this.createParcelModalContent);

      this._createParcelModalRef.result.then((result) => {
          console.log(`Closed with: ${result}`);
        }, (reason) => {
          console.log(`Dismissed ${this.getDismissReason(reason)}`);
        });
    }

    openProcessParcelModal(parcel: Parcel) {
      this.selectedParcelForProcessing = parcel;
      this._processParcelModalRef = this._modalService.open(this.processParcelModalContent);

      this._processParcelModalRef.result.then((result) => {
          console.log(`Closed with: ${result}`);
          this.selectedParcelForProcessing = null;
        }, (reason) => {
          console.log(`Dismissed ${this.getDismissReason(reason)}`);
          this.selectedParcelForProcessing = null;
        });
    }

    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return  `with: ${reason}`;
      }
    }
}
