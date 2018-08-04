import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { ParcelsRepository } from '../../repositories/parcels.repository';

@Component({
    selector: 'app-parcels-page',
    templateUrl: './parcels.page.html',
    styleUrls: ['./parcels.page.scss']
})
export class ParcelsPageComponent implements OnInit {

    @ViewChild('createParcelModalContent') createParcelModalContent: TemplateRef<any>;

    private _createParcelModalRef: NgbModalRef;

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
