import { Component, OnInit } from '@angular/core';
import { SessionRepository } from '../../repositories/session.respository';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(public session: SessionRepository) { }

}
