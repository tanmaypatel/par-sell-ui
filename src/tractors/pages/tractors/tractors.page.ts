import { Component, OnInit } from '@angular/core';
import { TractorsRepository } from '../../repositories/tractors.repository';

@Component({
  selector: 'app-tractors-page',
  templateUrl: './tractors.page.html',
  styleUrls: ['./tractors.page.scss']
})
export class TractorsPageComponent implements OnInit {

  constructor(public tractorsRepo: TractorsRepository) { }

  ngOnInit() {
    this.retrieveTractors();
  }

  retrieveTractors() {
    this.tractorsRepo.retrieveTractors();
  }
}
