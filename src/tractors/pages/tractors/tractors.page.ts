import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { TractorsRepository } from '../../repositories/tractors.repository';

@Component({
    selector: 'app-tractors-page',
    templateUrl: './tractors.page.html',
    styleUrls: ['./tractors.page.scss']
})
export class TractorsPageComponent implements OnInit {

    @ViewChild('createTractorModalContent') createTractorModalContent: TemplateRef<any>;

    private _createTractorModalRef: NgbModalRef;

    constructor(public tractorsRepo: TractorsRepository, private _modalService: NgbModal) {}

    ngOnInit() {
        this.retrieveTractors();
    }

    retrieveTractors() {
        this.tractorsRepo.retrieveTractors();
    }

    openCreateTractorModal() {
      this._createTractorModalRef = this._modalService.open(this.createTractorModalContent);

      this._createTractorModalRef.result.then((result) => {
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
